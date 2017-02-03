"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/save", (req, res) => {
    debugger;
    let data = {
      title: req.body.title,
      year: req.body.year,
      rating: req.body.rating,
      poster: req.body.poster,
      genres: req.body.genres.join(", "),
      rated: req.body.rated,
      director: req.body.director,
      runtime: req.body.runtime,
      plot: req.body.plot,
      date: req.body.date
    };
    knex('movies')
      .insert(data)
      .then(() => {
        console.log('Successfully saved movie to db');
    });
    res.json({});
  });

  // Insert new item into db
  router.post("/search", (req, res) => {
    let userid = Number(req.body.user_id)
    let data = {input: req.body.searchValue, comment: req.body.comment, user_id: userid, movie_id: null};
    knex('searches')
      .insert(data)
      .then(() => {
        console.log('Successfully saved search to db');
      });
    res.json({});
  });

  return router;
}
