const express = require("express");
const {
  getConversation,
  sendMessage,
  deleteConversation,
} = require("../controllers/coversation.controller");

const conversationRouter = express.Router();

conversationRouter.get("/:userId/chat/conversation/get", getConversation);
conversationRouter.post("/chat/message/send", sendMessage);
conversationRouter.delete("/:userId/chat/conversation/delete", deleteConversation);

module.exports = conversationRouter;
