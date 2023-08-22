const express = require("express");
const router = express.Router();
// create a User Model Instance
const userModel = require("../models/user");
const User = userModel.User;

const userController = require("../controllers/user-controller");

// Sends token via json
router.post("/login", userController.LoginUser);

// Could probably be processed in app (clear cookie)
router.get("/logout", userController.LogoutUser);

// Get all users
router.get("/", userController.getAllUsers);

// Register new user
router.get("/register", userController.RegisterUser);

module.exports = router;
