import * as errorController from "../controllers/errorController.js";
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

export async function getMessages(req, res) {
  try {
    const conversation = await Conversation.findById(req.params.conversationId);
    if (!conversation) {
      return errorController.errorHandler(res, "Conversation not found", 404);
    }
    if (!conversation.members.includes(req.user.id)) {
      return errorController.errorHandler(res, "You are not member of this conversation", 401);
    }
    const messages = await Message.find({ conversation: req.params.conversationId })
      .populate("sender", "_id username fullName avatar")
      .sort({ createdAt: -1 });
    return res.status(200).json(messages);
  } catch (error) {
    return errorController.serverErrorHandler(error, res);
  }
}

export async function createMessage(req, res) {
  try {
    if (!req.body.content || !req.body.conversationId) {
      return errorController.errorHandler(res, "Create message must have content and Conversation Id", 400);
    }
    const conversation = await Conversation.findById(req.body.conversationId);
    if (!conversation) {
      return errorController.errorHandler(res, "Conversation not found", 404);
    }
    if (!conversation.members.includes(req.user.id)) {
      return errorController.errorHandler(res, "You are not member of this conversation", 401);
    }
    const message = await Message.create({
      sender: req.user.id,
      content: req.body.content,
      conversation: req.body.conversationId,
    });
    await Conversation.findByIdAndUpdate(req.body.conversationId, { lastMessage: message._id });
    const fullMessage = await Message.findById(message._id).populate("sender", "_id username fullName avatar");
    return res.status(200).json(fullMessage);
  } catch (error) {
    return errorController.serverErrorHandler(error, res);
  }
}

export async function deleteMessage(req, res) {
  try {
    if (!req.body.messageId || !req.body.sender) {
      return errorController.errorHandler(res, "DeleteMessage must have messageId and senderId", 400);
    }
    if (req.body.sender !== req.user.id) {
      return errorController.errorHandler(res, "You are not allow to delete this message", 403);
    }
    const updatedMessage = await Message.findOneAndUpdate(
      { _id: req.body.messageId, sender: req.body.sender },
      { isDeleted: true },
      { new: true }
    ).populate("sender", "_id username fullName avatar");
    return res.status(200).json(updatedMessage);
  } catch (error) {
    return errorController.serverErrorHandler(error, res);
  }
}
