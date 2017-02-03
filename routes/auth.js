"use strict";

const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const router = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    if (req.session.user) {
      res.render("index", { isLoggedIn: true });
    }
    else {
      res.render("index", { isLoggedIn: false });
    }
  });

  router.get("/login", (req, res) => {
    if (req.session.user) {
      res.redirect("/");
    }
    else {
      res.render("login", { message: req.flash('loginMsg')});
    }
  });

  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      req.flash('loginMsg', 'You need to fill in the blanks');
      return res.redirect('login');
    }
    knex.select('*')
    .from('users')
    .where('email', email)
    .then((result) => {
      if (result.length == 0) {
        req.flash('loginMsg', "you don't have an account. Please sign up");
        return res.redirect('login');
      }
      else if (!bcrypt.compareSync(password, result[0].password)){
        req.flash('loginMsg', "Incorrect password. Please try again");
        return res.redirect('login');
      }
      else{
        req.session.user = result[0];
        if (req.session.user.is_owner) {
          return res.redirect('/owners/orders');
        }
        else return res.redirect('/users/restaurants/');
      }
    })
  });

  router.get("/register", (req, res) => {
    if (req.session.user) {
      res.redirect("/");
    }
    res.render("register", { message: req.flash('registerMsg')});
  });

  router.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    if (!email || !password || !name || !phone) {
      req.flash('registerMsg', 'You need to fill in the blanks');
      res.redirect('register');
    }
    else {
      knex.select('*')
      .from('users')
      .where('email', email)
      .then((results) => {
        if(results.length == 0) {
          const hashedPassword = bcrypt.hashSync(password);
          const newUser = {
            name: name,
            email: email,
            password: hashedPassword,
            is_owner: false
          };
          knex('users')
          .insert(newUser)
          .then(() => {
            req.session.user = newUser;
            res.redirect('/');
          });
        }
        else {
          req.flash('registerMsg', 'You already have an account. Please Sign In');
          res.redirect('register');
        }
      });
    }
  });

  router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
      console.log('cannot destroy session');
    })
    res.redirect('/');
  });

  return router;
}
