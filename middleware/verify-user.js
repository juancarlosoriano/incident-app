let mongoose = require("mongoose");
let User = require("../models/user");

const VerifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const user = await User.findByToken(token);
    if (!user) {
      res.redirect("/login");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { VerifyToken };
