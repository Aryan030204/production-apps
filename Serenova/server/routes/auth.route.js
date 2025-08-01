const loginController = require("../controllers/login.controller");
const logoutController = require("../controllers/logout.controller");
const signupController = require("../controllers/signup.controller");

const authRouter = require("express").Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);

module.exports = authRouter;
