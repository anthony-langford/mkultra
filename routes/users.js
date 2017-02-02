"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  // router.get("/", (req, res) => {
  //   knex
  //     .select("*")
  //     .from("users")
  //     .then((results) => {
  //       res.json(results);
  //   });
  // });

  router.get("/", (req, res) => {
    let url = 'http://www.omdbapi.com/?t=scream';


    knex
      .select("users.name as username", "items.name as itemname", "items.category as cat", "useritems.comment as comment")
      .from("users")
      .leftJoin("useritems", "users.id", "useritems.user_id")
      .leftJoin("items", "items.id", "useritems.item_id")
      .then((useritem) => {
        console.log(useritem);
        res.json(useritem);
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
