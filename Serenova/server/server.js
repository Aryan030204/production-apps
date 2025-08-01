const express = require("express");
const app = express();
const connect_db = require("./utils/db");
const authRouter = require("./routes/auth.route");
const profileRouter = require("./routes/profile.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const routesRouter = require("./routes/routes.route");
const storyRouter = require("./routes/story.route");
const userRouter = require("./routes/user.route");
const conversationRouter = require("./routes/conversation.route");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "https://production-apps.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use("/api/", authRouter);
app.use("/api/", profileRouter);
app.use("/api/", routesRouter);
app.use("/api/", storyRouter);
app.use("/api/", userRouter);
app.use("/api/", conversationRouter);

app.listen(process.env.PORT, () => {
  try {
    connect_db();
    console.log(`server is running on port ${process.env.PORT}`);
  } catch (err) {
    console.log(err);
  }
});
