let mongoose = require("mongoose");
let userModel = require("../models/user");
let User = userModel.User;

const VerifyToken = async (req, res, next) => {
  try {
    console.log('In verify token');

    const token = req.cookies.token;
    const user = await User.findByToken(token);
    if (!user) {
      res.render('/login');
    }
    req.user = user;
    next();
  } catch (err) {
    if(err.message == "Error verifying token: jwt must be provided"){
      res.redirect('/login');
    } else{
    res.status(401).json({ message: err.message });
    }
  }
};

module.exports = { VerifyToken };
