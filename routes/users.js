"use strict";

const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .leftJoin("useritems", "users.id", "useritems.user_id")
      .leftJoin("items", "items.id", "useritems.item_id")
      .then((useritem) => {
        console.log(useritem);
        res.json(useritem);
      });
  });

  router.post("/", (req, res) => {
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

  router.get("/", (req, res) => {
    if (req.session.user) {
      res.render("index", { isLoggedIn: true});
    } else {
      res.render("index", { isLoggedIn: false});
    }
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
        return res.redirect("login");
      } else if (!bcrypt.compareSync(password, result[0].password)){
          req.flash("loginMsg", "The password you entered is incorrect. Please try again");
          return res.redirect("login");
        } else {
          return res.redirect('/users');
        }
    })
  });

  router.get("/", (req, res) => {
    if (req.session.user) {
      res.redirect("/");
    }
      res.render("register", { message: req.flash("registerMsg")});
  });

  router.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    if (!email || !password || !name) {
      req.flash("registerMsg", "Please fill out the required input fields");
      res.redirect("register");
    } else {
      knex.select("*")
      .from("users")
      .where("email", email)
      .then((results) => {
        if(results.length == 0) {
          const hashedPassword = bcrypt.hashSync(password);
          const newUser = {
            name: name,
            email: email,
            password: hashedPassword
          };
          knex("users")
          .insert(newUser)
          .then(() => {
            req.session.user = newUser;
            res.redirect("/");
          });
        }
        else {
          req.flash("registerMsg", "An account linked to this user currently exists: Please sign in");
          res.redirect("register");
        }
      });
    }
  });

  router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
      throw err;
    })
    res.redirect("/");
  });

  return router;
}
