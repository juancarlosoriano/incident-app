const express = require("express");
let session = require("express-session");
const router = express.Router();
let flash = require("connect-flash");
let LoginController = require("../controllers/login-controller");
let passport = require("passport");

let mongoose = require("mongoose");
let userModel = require("../models/user");
let User = userModel.User;

let isLoggedIn = false;

function userLoggedIn(req, res, next) {
  // Check if user is logged in
  if (req.cookies.token) {
    isLoggedIn = true;
    console.log("User Logged In");
  } else {
    isLoggedIn = false;
    console.log("User NOT Logged In");
  }
  next();
}

/* GET home page. */
router.get("/", userLoggedIn, function (req, res, next) {
  res.render("index", { title: "Home", isLoggedIn: isLoggedIn });
});

module.exports = router;

/* GET Route for displaying the login page. */
router.get("/login", userLoggedIn, function (req, res, next) {
  // check if the user is already logged in
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.name : "",
      isLoggedIn: isLoggedIn,
    });
  } else {
    return res.redirect("/");
  }
});

// POST Route for processing login page
router.post("/login", LoginController.LoginUser);

// GET Route for displaying register page
router.get("/register", userLoggedIn, function (req, res, next) {
  // check if the user is not already logged in
  if (!req.user) {
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      displayName: req.user ? req.user.name : "",
      isLoggedIn: isLoggedIn,
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
});
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
              res.redirect('/contact-list');
          });
      }
  });
});
*/
// GET to perform logout
router.get("/logout", function (req, res, next) {
  req.logout((err) => {
    if (err) {
      // handle error here
      console.log(err);
      return next(err);
    }

    res.clearCookie("token");
    return res.redirect("/");
  });
});
