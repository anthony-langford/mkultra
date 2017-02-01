"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // See all users:

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .outerJoin("userMovies", "movies")
      .then((results) => {
        res.json(results);
      });
  });

  router.post("/api/users", (req, res) => {
    if (!req.body.text) {
      res.status(400).json({ error: 'Invalid Request: No input in POST body' });
      return;
    }
    const user = req.body.user ? req.body.user : res.status(400).json({ error: 'Invalid User '});
    const post = {
      // user: user,
      content: {
        text: req.body.text
      },
    }
  });

  return router;
}

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
