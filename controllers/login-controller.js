let User = require("../models/user");

const LoginUser = async (req, res, next) => {
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

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

    //res.json({ message: 'Login successful', status: 1 });
    res.redirect("/");
    console.log("Login Successful");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { LoginUser };
