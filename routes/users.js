"use strict";

const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const router  = express.Router();

module.exports = (knex) => {

  router.post("/save", (req, res) => {
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
    let data = { input: req.body.searchValue, comment: req.body.comment, user_id: userid, movie_id: null };
    knex('searches')
      .insert(data)
      .then(() => {
        console.log('Successfully saved search to db');
      });
    res.json({});
  });

  // router.get("/login", (req, res) => {
  //   if (req.session.user) {
  //     res.redirect("/");
  //   } else {
  //     res.render("login", { message: req.flash("loginMsg")});
  //   }
  // });

  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
      if (!email || !password) {
        req.flash("loginMsg", "Please fillout the required input fields");
        return res.redirect("login");
    }
    knex.select("*")
    .from("users")
    .where("email", email)
    .then((result) => {
      if (result.length == 0) {
        req.flash("loginMsg", "No account found: Please sign up");
        res.redirect("/login");
      } else if (!bcrypt.compareSync(password, result[0].password)){
        req.flash("loginMsg", "The password you entered is incorrect. Please try again");
        return res.redirect("login");
      } else {
        return res.redirect('/users');
      }
    })
  });

  // router.post("/register", (req, res) => {
  //   const email = req.body.email;
  //   const password = req.body.password;
  //   const name = req.body.name;
  //   if (!email || !password || !name) {
  //     req.flash("registerMsg", "Please fill out the required input fields");
  //     res.redirect("register");
  //   } else {
  //     knex.select("*")
  //     .from("users")
  //     .where("email", email)
  //     .then((results) => {
  //       if(results.length == 0) {
  //         const hashedPassword = bcrypt.hashSync(password);
  //         const newUser = {
  //           name: name,
  //           email: email,
  //           password: hashedPassword
  //         };
  //         knex("users")
  //         .insert(newUser)
  //         .then(() => {
  //           req.session.user = newUser;
  //           res.redirect("/");
  //         });
  //       }
  //       else {
  //         req.flash("registerMsg", "An account linked to this user currently exists: Please sign in");
  //         res.redirect("register");
  //       }
  //     });
  //   }
  // });

  router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      throw err;
    })
    res.redirect("/");
  });

  let queryFound = false;
  let results2 = [];

  router.post("/query", (req, res) => {
    let query = req.body.text;
    // knex.select('*')
    //   .from('movies')
    //   .where('title', '=', query)
    //   .then(function(results) {
    //       queryFound = true;
    //       console.log('Found search value in db');
    //       results2.push(results[0]);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });

    let newItem = {
      title: 'Gladiator',
      year: 2000,
      rating: 8.5,
      poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgwMzQzNTQ1Ml5BMl5BanBnXkFtZTgwMDY2NTYxMTE@._V1_SX300.jpg',
      genres: 'Action, Adventure, Drama',
      rated: 'R',
      director: 'Ridley Scott',
      runtime: 155,
      plot: "When a Roman general is betrayed and his family murdered by an emperor's corrupt son, he comes to Rome as a gladiator to seek revenge.",
      date: 1486344897303
    }
    res.json(newItem);

    // if (queryFound === false) {

    // } else {
    //   res.status(400).end();
    // }

  });

  return router;
}
