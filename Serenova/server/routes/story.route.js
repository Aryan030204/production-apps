const express = require("express");
const {
  getAllStories,
  getAllStoriesByUser,
  getStoryById,
  postStory,
  deleteStory,
  updateStory,
  viewStory,
  increaseLike,
  decreaseLike,
  increaseDislike,
  decreaseDislike,
  getTrendingStories,
  getMostViewedStories,
  getRecentStories,
  getMostLikedStories,
} = require("../controllers/story.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const storyRouter = express.Router();

// Public story routes
storyRouter.get("/stories/all", getAllStories);
storyRouter.get("/stories/trending", getTrendingStories);
storyRouter.get("/stories/mostviewed", getMostViewedStories);
storyRouter.get("/stories/recent", getRecentStories);
storyRouter.get("/stories/mostliked", getMostLikedStories);
storyRouter.get("/stories/:id", getStoryById);
storyRouter.patch("/stories/:id/viewed", viewStory);

// Protected story routes
storyRouter.get("/:userId/stories", authMiddleware, getAllStoriesByUser);
storyRouter.post("/stories/add", authMiddleware, postStory);
storyRouter.delete("/stories/:id", authMiddleware, deleteStory);
storyRouter.put("/stories/:id", authMiddleware, updateStory);

// Likes & Dislikes
storyRouter.patch("/stories/:id/like/increment", authMiddleware, increaseLike);
storyRouter.patch("/stories/:id/like/decrement", authMiddleware, decreaseLike);
storyRouter.patch(
  "/stories/:id/dislike/increment",
  authMiddleware,
  increaseDislike
);
storyRouter.patch(
  "/stories/:id/dislike/decrement",
  authMiddleware,
  decreaseDislike
);

module.exports = storyRouter;
