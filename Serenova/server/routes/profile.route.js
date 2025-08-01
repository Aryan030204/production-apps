const {
  updateProfile,
  getProfile,
} = require("../controllers/profile.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const profileRouter = require("express").Router();

profileRouter.get("/profile", authMiddleware, getProfile);

profileRouter.patch("/profile/update", authMiddleware, updateProfile);

module.exports = profileRouter;
