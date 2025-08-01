const { default: mongoose } = require("mongoose");
const Story = require("../models/story.model");
const User = require("../models/user.model");

//get all stories (feed)
const getAllStories = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const skip = (page - 1) * limit;
    const stories = await Story.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalStories = await Story.countDocuments();

    res.status(200).json({
      message: "Stories fetched successfully",
      currentPage: page,
      totalPages: Math.ceil(totalStories / limit),
      totalStories: totalStories,
      stories: stories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching stories",
      error: err,
    });
  }
};

//get all stories by author/user
const getAllStoriesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const stories = await Story.find({ userId });

    res.status(200).json({
      message: "Stories fetched successfully",
      stories: stories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching story",
      error: err,
    });
  }
};

//get a story by its id
const getStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }
    res.status(200).json({
      message: "Story fetched successfully",
      story: story,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching story",
      error: err,
    });
  }
};

//create a new story
const postStory = async (req, res) => {
  try {
    const { userId, title, content, author, likes, dislikes } = req.body;
    if (!userId || !title || !content || !author) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newStory = new Story({
      userId,
      title,
      content,
      author,
      likes,
      dislikes,
    });

    await newStory.save();
    res.status(201).json({
      message: "Story created successfully",
      story: newStory,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error posting story",
      error: err.message,
    });
  }
};

//delete a story
const deleteStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findByIdAndDelete(id);
    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }
    res.status(200).json({
      message: "Story deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting story",
      error: err,
    });
  }
};

//update/edit a story
const updateStory = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    const story = await Story.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.status(200).json({
      message: "Story updated successfully",
      story,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating story",
      error: err.message,
    });
  }
};

//like a story
const increaseLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;

    const user = await User.findById(_id);
    const story = await Story.findById(id);

    if (!story) return res.status(404).json({ message: "Story not found" });

    const hasLiked = user.likedPosts.includes(id);
    const hasDisliked = user.dislikedPosts.includes(id);

    if (hasLiked) {
      // Unlike
      story.likes = Math.max(0, story.likes - 1);
      user.likedPosts.pull(id);
    } else {
      // Like
      story.likes += 1;
      user.likedPosts.push(id);

      // Remove previous dislike (if any)
      if (hasDisliked) {
        story.dislikes = Math.max(0, story.dislikes - 1);
        user.dislikedPosts.pull(id);
      }
    }

    await user.save();
    await story.save();

    res.status(200).json({
      message: hasLiked ? "Story unliked" : "Story liked",
      story,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error processing like toggle",
      error: err.message,
    });
  }
};

const decreaseLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;

    const user = await User.findById(_id);
    const story = await Story.findById(id);

    if (!story) return res.status(404).json({ message: "Story not found" });

    const hasDisliked = user.dislikedPosts.includes(id);
    const hasLiked = user.likedPosts.includes(id);

    if (hasDisliked) {
      // Remove dislike
      story.dislikes = Math.max(0, story.dislikes - 1);
      user.dislikedPosts.pull(id);
    } else {
      // Add dislike
      story.dislikes += 1;
      user.dislikedPosts.push(id);

      // Remove like if it exists
      if (hasLiked) {
        story.likes = Math.max(0, story.likes - 1);
        user.likedPosts.pull(id);
      }
    }

    await user.save();
    await story.save();

    res.status(200).json({
      message: hasDisliked ? "Dislike removed" : "Story disliked",
      story,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error processing dislike toggle",
      error: err.message,
    });
  }
};

//dislike a story
const increaseDislike = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findByIdAndUpdate(id, {
      $inc: { dislikes: 1 },
    });
    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.status(200).json({
      message: "Story like increased successfully",
      story: story,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error increasing like on story",
      error: err.message,
    });
  }
};

const decreaseDislike = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findByIdAndUpdate(id, {
      $inc: { dislikes: -1 },
    });
    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.status(200).json({
      message: "Story like increased successfully",
      story: story,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error increasing like on story",
      error: err.message,
    });
  }
};

//view a story (views)
const viewStory = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findByIdAndUpdate(
      id,
      {
        $inc: { views: 1 },
      },
      {
        new: true,
      }
    );
    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.status(200).json({
      message: "Story viewed successfully",
      story: story,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error viewing story",
      error: err,
    });
  }
};

//get trending stories
const getTrendingStories = async (req, res) => {
  try {
    const stories = await Story.find()
      .sort({ views: -1, dislikes: 1, likes: -1 })
      .limit(5);
    res.status(200).json({
      message: "Trending stories fetched successfully",
      trendingStories: stories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error getting trending stories",
      error: err.message,
    });
  }
};

//get most viewed stories
const getMostViewedStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ views: -1 }).limit(5);
    res.status(200).json({
      message: "Most viewed stories fetched successfully",
      mostViewedStories: stories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error getting most viewed stories",
      error: err.message,
    });
  }
};

//get most liked stories
const getMostLikedStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ likes: -1 }).limit(5);
    res.status(200).json({
      message: "Most liked stories fetched successfully",
      mostLikedStories: stories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error getting most liked stories",
      error: err.message,
    });
  }
};

//get recent stories
const getRecentStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json({
      message: "Recent stories fetched successfully",
      recentStories: stories,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error getting recent stories",
      error: err.message,
    });
  }
};

module.exports = {
  getAllStories,
  getAllStoriesByUser,
  getStoryById,
  postStory,
  deleteStory,
  updateStory,
  increaseLike,
  decreaseLike,
  increaseDislike,
  decreaseDislike,
  viewStory,
  getMostLikedStories,
  getRecentStories,
  getMostViewedStories,
  getTrendingStories,
};
