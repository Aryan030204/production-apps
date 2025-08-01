const mongoose = require("mongoose");
const User = require("../models/user.model");
const Story = require("../models/story.model");

// Save a story post
const savePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;

    const storyId = mongoose.Types.ObjectId.createFromHexString(id);
    const story = await Story.findById(storyId);
    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: "Story not found" });
    }

    const user = await User.findById(_id);
    if (user.savedPosts.some((postId) => postId.equals(storyId))) {
      return res
        .status(400)
        .json({ success: false, message: "Story already saved" });
    }

    user.savedPosts.push(storyId);
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Story saved successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// Unsave a story post
const unsavePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;

    const storyId = mongoose.Types.ObjectId.createFromHexString(id);
    const user = await User.findById(_id);

    if (!user.savedPosts.some((postId) => postId.equals(storyId))) {
      return res
        .status(400)
        .json({ success: false, message: "Story not found in saved posts" });
    }

    user.savedPosts = user.savedPosts.filter(
      (postId) => !postId.equals(storyId)
    );
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Story unsaved successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// Get all saved posts
const getSavedPosts = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).populate("savedPosts").lean();

    res.status(200).json({ success: true, savedPosts: user.savedPosts });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

// Create a new story post
const createPost = async (req, res) => {
  try {
    const { title = "", content = "" } = req.body;
    const { _id, firstName, lastName } = req.user;

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingStory = await Story.findOne({
      userId: _id,
      title: { $regex: new RegExp(`^${trimmedTitle}$`, "i") },
      content: trimmedContent,
    });

    if (existingStory) {
      return res
        .status(400)
        .json({ message: "You have already posted this story." });
    }

    // If same draft exists, remove from drafts
    const existingDraft = await Story.findOne({
      userId: _id,
      title: trimmedTitle,
      content: trimmedContent,
    });
    if (existingDraft) {
      await User.findByIdAndUpdate(_id, {
        $pull: { draftPosts: existingDraft._id },
      });
      await Story.findByIdAndDelete(existingDraft._id);
    }

    const newStory = new Story({
      userId: _id,
      title: trimmedTitle,
      content: trimmedContent,
      author: `${firstName} ${lastName}`.trim(),
      likes: 0,
      dislikes: 0,
      views: 0,
    });

    await newStory.save();

    res
      .status(201)
      .json({ message: "Story posted successfully", story: newStory });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error posting story", error: err.message });
  }
};

// Delete a post (only by author)
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;

    const story = await Story.findOneAndDelete({ _id: id, userId: _id });
    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: "Story not found or unauthorized" });
    }

    res
      .status(200)
      .json({ success: true, message: "Story deleted successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting story",
      error: err.message,
    });
  }
};

// Update a post (only by author)
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title = "", content = "" } = req.body;
    const { _id } = req.user;

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    const story = await Story.findOneAndUpdate(
      { _id: id, userId: _id },
      { title: trimmedTitle, content: trimmedContent },
      { new: true }
    );

    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: "Story not found or unauthorized" });
    }

    res
      .status(200)
      .json({ success: true, message: "Story updated successfully", story });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating story",
      error: err.message,
    });
  }
};

// Get all draft posts
const getDrafts = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).populate("draftPosts").lean();

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Drafts retrieved successfully",
      drafts: user.draftPosts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching drafts",
      error: err.message,
    });
  }
};

// Save a draft story
const saveDraft = async (req, res) => {
  try {
    const { _id } = req.user;
    const { title = "", content = "" } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user ID" });
    }

    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const existingDraft = await Story.findOne({
      userId: _id,
      title: { $regex: new RegExp(`^${title}$`, "i") },
      content: content,
    });

    if (existingDraft) {
      return res
        .status(400)
        .json({ success: false, message: "Draft already exists" });
    }

    const draft = new Story({
      userId: _id,
      title: title,
      content: content,
      author: `${user.firstName} ${user.lastName || ""}`.trim(),
    });

    await draft.save();

    user.draftPosts = Array.isArray(user.draftPosts) ? user.draftPosts : [];
    user.draftPosts.push(draft._id);
    await user.save();

    res
      .status(201)
      .json({ success: true, message: "Draft saved successfully", draft });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

const getDraftbyId = async (req, res) => {
  try {
    const { id } = req.params;

    const draft = await Story.findById(id);

    if (!draft) {
      return res.status(404).json({
        success: false,
        message: "Draft not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Draft fetched successfully",
      draft,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

module.exports = {
  savePost,
  unsavePost,
  getSavedPosts,
  createPost,
  deletePost,
  updatePost,
  getDrafts,
  saveDraft,
  getDraftbyId
};
