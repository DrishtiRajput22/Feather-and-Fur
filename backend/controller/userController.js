const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }
 const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  await user.save();
  res.status(201).json({
  message: "User registered successfully",
});
};

const loginUser = async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) {
  return res.status(400).json({
    message: "Invalid email or password",
  });
}
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  return res.status(400).json({
    message: "Invalid email or password",
  });
}
const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
res.status(200).json({
  message: "Login successful",
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
  },
});
};
const getUserProfile = async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};