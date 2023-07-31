let mongoose = require("mongoose");
let userModel = require("../models/user");
let User = userModel.User;

const VerifyToken = async (req, res, next) => {
  try {
    console.log('In verify token');

    if(req.cookies.token){
    const token = req.cookies.token;
    const user = await User.findByToken(token);
    if (!user) {
      res.redirect('/login');
    }
    req.user = user;
    next();
  } else {
    res.redirect('/login');
  }
  } catch (err) {
    if(err.message == "Error verifying token: jwt must be provided"){
      res.redirect('/login');
    } else {
    res.status(401).json({ message: err.message });
    }
  }
};

module.exports = { VerifyToken };
