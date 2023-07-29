const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long'],
    maxlength: [128, 'Password must be less than 128 characters long']
  }
},{
 timestamps: true 
},{
    collection: 'user'
});

// Hash password before saving to database
userSchema.pre('save', async function() {
  const user = this;
  if (!user.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

// Compare password with hashed password in database
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Increment login count when user logs in
userSchema.methods.incrementLoginCount = async function() {
  this.loginCount += 1;
  return await this.save();
};

// Generate a JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
};

userSchema.statics.findByToken = async function (token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await this.findOne({ _id: decoded._id });
  } catch (err) {
    throw new Error(`Error verifying token: ${err.message}`);
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
