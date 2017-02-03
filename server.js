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
  res.render("index");
});

// Get item data from iMDB
app.get("/imdb", (req, res) => {
  omdb.get({ title: req.query.text }, true, (err, itemData) => {
    if(err) {
        return console.log(err);
    }

    if(!itemData) {
        return console.log('Item not found!');
    }
    console.log(itemData);
    res.json(itemData);
  });
});

app.post("/", (req, res) => {
  if (!req.body) {
    res.status(400).json({ error: 'Invalid Request: No input in POST body' });
    return;
  }
  // const user = req.body.user ? req.body.user : res.status(400).json({ error: 'Invalid User' });
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
