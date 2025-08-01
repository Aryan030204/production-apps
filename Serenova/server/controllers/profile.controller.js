const User = require("../models/user.model");

const getProfile = (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "something went wrong",
      Error: err.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { email, firstName, lastName, age, gender } = req.body;
    const { _id } = req.user;
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstName,
        lastName,
        age,
        gender,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating profile",
      error: err,
    });
  }
};

module.exports = {
  updateProfile,
  getProfile,
};
