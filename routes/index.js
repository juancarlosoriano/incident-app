const express = require("express");
const router = express.Router();
let flash = require("connect-flash");
let LoginController = require("../controllers/login-controller");

let mongoose = require("mongoose");
let User = require("../models/user");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home" });
});

module.exports = router;

/* GET Route for displaying the login page. */
router.get("/login", function (req, res, next) {
  // check if the user is already logged in
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.User ? req.User.name : "",
    });
  } else {
    return res.redirect("/");
  }
});

// POST Route for processing login page
router.post("/login", LoginController.LoginUser);

// GET Route for displaying register page
router.get("/register", function (req, res, next) {
  // check if the user is not already logged in
  if (!req.user) {
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      displayName: req.User ? req.User.name : "",
    });
  } else {
    return res.redirect("/");
  }
});

// POST Route for processing register page
router.post("/register", function (req, res, next) {
  // Initialize a User object
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
  });

  console.log(newUser);
  newUser.save();

  console.log("Registration Successful");
  res.redirect("/");
  /*
  User.register(newUser, req.body.password, (err) => {
      if(err)
      {
          console.log(err);
          if(err.name == 'UserExistsError')
          {
              req.flash
              (
                  'registerMessage',
                  'Registration Error: User Already Exists!'
              );
              console.log('Error: User Already Exists!');
          }
          return res.render('auth/register', {
              title: "Register",
              messages: req.flash('registerMessage'),
              displayName: req.user ? req.user.name : ''
          });
      } else {
          // If registration is successful
          console.log("Registration Successful");
          return passport.authenticate('local')(req, res, () => {
              res.redirect('/');
          });
      }
  });*/
});

// GET to perform logout
router.get("/logout", function (req, res, next) {
  req.logout((err) => {
    if (err) {
      // handle error here
      console.log(err);
      return next(err);
    }
    return res.redirect("/");
  });
});
