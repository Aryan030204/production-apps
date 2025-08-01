const mongoose = require("mongoose");
const validator = require("validator");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "not to say"],
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      validate: {
        validator: function (value) {
          return validator.isEmail(value);
        },
        message: "Invalid Email",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 256,
    },
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
        default: [],
      },
    ],
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
    dislikedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
    draftPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Story",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJwt = async function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
