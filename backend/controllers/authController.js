const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

module.exports = { login };