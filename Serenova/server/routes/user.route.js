const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getSavedPosts,
  savePost,
  unsavePost,
  createPost,
  updatePost,
  deletePost,
  getDrafts,
  saveDraft,
  getDraftbyId,
} = require("../controllers/user.controller");

const userRouter = express.Router();

// Saved stories
userRouter.get("/user/stories/saved", authMiddleware, getSavedPosts);
userRouter.post("/user/stories/:id/save", authMiddleware, savePost);
userRouter.post("/user/stories/:id/unsave", authMiddleware, unsavePost);

// Story CRUD
userRouter.post("/user/stories/create", authMiddleware, createPost);
userRouter.put("/user/stories/:id/update", authMiddleware, updatePost);
userRouter.delete("/user/stories/:id/delete", authMiddleware, deletePost);

// Drafts
userRouter.post("/user/stories/savedraft", authMiddleware, saveDraft);
userRouter.get("/user/stories/drafts", authMiddleware, getDrafts);
userRouter.get("/user/stories/drafts/:id", authMiddleware, getDraftbyId);

module.exports = userRouter;
