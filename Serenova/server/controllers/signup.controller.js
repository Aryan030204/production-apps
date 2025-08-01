const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;
    User.validate(req.body);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      ...req.body,
      password: hashedPass,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error signing up user",
      error: err.message,
    });
  }
};

module.exports = signupController;
