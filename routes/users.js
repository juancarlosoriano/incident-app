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

//router.get('/users', userController.getAllUsers);

module.exports = router;

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
