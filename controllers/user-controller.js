// create a User Model Instance
const userModel = require("../models/user");
const { all } = require("../routes/tickets");
const User = userModel.User;

const LoginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = user.generateAuthToken();

    res.status(200).json({
      message: "Login successful",
      status: 1,
      token: token,
      userId: user._id,
      name: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let allUsers = await User.find({}, "_id name");

    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const RegisterUser = async (req, res) => {
  try {
    let newUser = new User(req.body);
    await newUser.save();

    res.status(200).json({ message: "User is registered!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { LoginUser, getAllUsers, RegisterUser };
