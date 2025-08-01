const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const decodedMsg = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { _id } = decodedMsg;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      message: "user must be logged in",
      error: err,
    });
  }
};

module.exports = authMiddleware;
