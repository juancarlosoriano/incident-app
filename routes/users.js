const express = require("express");
const router = express.Router();
// create a User Model Instance
const userModel = require("../models/user");
const User = userModel.User;

const userController = require("../controllers/user-controller");

// Sends token via json
router.post("/login", userController.LoginUser);

// Get all users
router.get("/", userController.getAllUsers);

// Register new user
router.post("/register", userController.RegisterUser);

module.exports = router;
