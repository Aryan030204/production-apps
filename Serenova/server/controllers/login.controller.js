const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const loginController = async (req, res) => {
  try {
    
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await user.getJwt();
    
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message || err,
    });
  }
};

module.exports = loginController;
