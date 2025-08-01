const Conversation = require("../models/conversation.model");
const genai = require("@google/genai").GoogleGenAI;
const relevantKeywords = require("../assets/keywords");
const User = require("../models/user.model");
const { default: mongoose } = require("mongoose");

const getConversation = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Check if user exists
    let user = await User.findById(userId);

    // If user doesn't exist, create guest with unique email
    if (!user) {
      const randomNum = Math.floor(Math.random() * 1000000);
      user = await User.create({
        firstName: "guest",
        age: 22,
        gender: "not to say",
        email: `guest${randomNum}@example.com`, // unique email
        password: "0123456789",
      });
    }

    // Find conversation
    let conversation = await Conversation.find({ userId: user._id });
    if (!conversation || conversation.length === 0) {
      conversation = new Conversation({
        userId: userId,
        messages: [
          {
            text: "Hi, what can I do for you?",
            sender: "bot",
          },
        ],
      });

      await conversation.save(); // Save to DB

      return res.status(200).json({
        success: true,
        message: "conversation fetched successfully",
        data: [conversation],
        "guest": user
      });
    }

    return res.status(200).json({
      success: true,
      message: "conversation fetched successfully",
      data: conversation,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "error fetching messages",
      error: err.message,
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { userId, text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message cannot be empty",
      });
    }

    const userTextLower = text.toLowerCase();
    const isRelevant = relevantKeywords.some((keyword) =>
      userTextLower.includes(keyword)
    );

    let replyText = "";

    if (!isRelevant) {
      replyText =
        "Oops! That might be out of my expertise. Let’s stick to helping and supporting women through important conversations.";
    } else {
      const bot = new genai({ apiKey: process.env.GEMINI_API_KEY });
      const prompt =
        text +
        ". give me answer in not more than 100 words and straight to the point.";
      const response = await bot.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      replyText =
        response.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't understand that.";
    }

    let conversation = await Conversation.findOne({ userId });
    if (!conversation) {
      conversation = new Conversation({ userId, messages: [] });
    }

    conversation.messages.push(
      {
        text,
        sender: "user",
        timestamp: new Date(),
      },
      {
        text: replyText,
        sender: "bot",
        timestamp: new Date(),
      }
    );

    await conversation.save();

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: conversation,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error sending message",
      error: err.message,
    });
  }
};

const deleteConversation = async (req, res) => {
  try {
    const { userId } = req.params;
    await Conversation.findOneAndDelete(userId);
    return res.status(200).json({
      success: true,
      message: "Conversation deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "error deleting messages",
      error: err.message,
    });
  }
};

module.exports = {
  getConversation,
  sendMessage,
  deleteConversation,
};
