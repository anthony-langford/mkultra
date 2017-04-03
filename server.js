"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const omdb        = require('omdb');
const spotify     = require("./spotify.js");

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  // if (req.session.user) {
  //     res.render("index", { isLoggedIn: true });
  //   } else {
      res.render("index", { isLoggedIn: false });
    // }
});

// Get item data from iMDB
app.get("/imdb", (req, res) => {
  omdb.get({ title: req.query.text }, true, (err, itemData) => {
    if (err) {
      return console.log(err);
    }

    if (!itemData) {
      return console.log('Item not found!');
    }
    console.log(itemData);
    res.json(itemData);
  });
});

app.get("/spotify", (req, res) => {
  console.log(req.query.text);
  spotify(req.query.text, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
    res.json(data);
  });
})

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'Invalid Request: No input in POST body' });
    return;
  }
  // const user = req.body.user ? req.body.user : res.status(400).json({ error: 'Invalid User' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
