import * as errorController from "../controllers/errorController.js";
import Conversation from "../models/Conversation.js";

export async function getConversations(req, res) {
  try {
    const conversations = await Conversation.find({
      members: { $in: req.user.id },
    })
      .populate("members", "_id fullName username avatar")
      .populate({
        path: "lastMessage",
        select: "content createdAt",
        populate: {
          path: "sender",
          select: "fullName username avatar",
        },
      })
      .sort({
        updatedAt: -1,
      });
    return res.status(200).json(conversations);
  } catch (error) {
    return errorController.serverErrorHandler(error, res);
  }
}

export async function createConversation(req, res) {
  try {
    const conversation = await Conversation.findOne({
      isGroupChat: false,
      $and: [{ members: { $in: req.user.id } }, { members: { $in: req.body.userId } }],
    })
      .populate("members", "_id fullName username avatar")
      .populate({
        path: "lastMessage",
        select: "content createdAt",
        populate: {
          path: "sender",
          select: "fullName username avatar",
        },
      });
    if (conversation) {
      return res.status(200).json(conversation);
    } else {
      const conversationData = {
        members: [req.user.id, req.body.userId],
      };
      const createdConversation = await Conversation.create(conversationData);
      const savedConversation = await Conversation.findOne({ _id: createdConversation._id }).populate(
        "members",
        "_id fullName username avatar"
      );
      return res.status(200).json(savedConversation);
    }
  } catch (error) {
    return errorController.serverErrorHandler(error, res);
  }
}

export async function createGroupConversation(req, res) {
  console.log(req.body);
  try {
    if (!req.body.members || req.body.members.length < 2 || !req.body.chatName) {
      return errorController.errorHandler(res, "Group conversation must have at least 2 members and a chat name", 400);
    }

    const conversation = await Conversation.create({
      chatName: req.body.chatName,
      isGroupChat: true,
      members: req.body.members,
      groupAdmin: req.user.id,
    });

    const fullConversation = await Conversation.findById(conversation._id).populate({
      path: "members",
      select: "_id fullName username avatar",
    });

    return res.status(200).json(fullConversation);
  } catch (error) {
    return errorController.serverErrorHandler(error, res);
  }
}

export async function renameGroupConversation(req, res) {
  try {
    if (!req.body.groupId || !req.body.newGroupName) {
      return errorController.errorHandler(res, "Group conversation must have a group id and a new group name", 400);
    }
    const updatedConversation = await Conversation.findOneAndUpdate(
      { _id: req.body.groupId, members: { $in: req.user.id } },
      { chatName: req.body.newGroupName },
      { new: true }
    )
      .populate({
        path: "members",
        select: "_id fullName username avatar",
      })
      .populate({
        path: "lastMessage",
        select: "content createdAt",
        populate: {
          path: "sender",
          select: "fullName username avatar",
        },
      });
    if (!updatedConversation) {
      return errorController.errorHandler(res, "You are not a member of this group", 400);
    }
    return res.status(200).json(updatedConversation);
  } catch (error) {
    return errorController.serverErrorHandler(error, res);
  }
}

export async function addUserToGroupConversation(req, res) {
  try {
    if (!req.body.newMemberId || !req.body.groupId) {
      return errorController.errorHandler(res, "Add member to group must have memberId and groupId", 400);
    }
    const updatedConversation = await Conversation.findOneAndUpdate(
      { _id: req.body.groupId, members: { $in: req.user.id } },
      { $addToSet: { members: req.body.newMemberId } },
      { new: true }
    )
      .populate({
        path: "members",
        select: "_id fullName username avatar",
      })
      .populate({
        path: "lastMessage",
        select: "content createdAt",
        populate: {
          path: "sender",
          select: "fullName username avatar",
        },
      });
    if (!updatedConversation) {
      return errorController.errorHandler(res, "You are not a member of this group", 400);
    }
    return res.status(200).json(updatedConversation);
  } catch (error) {
    return errorController.serverErrorHandler(error, res);
  }
}

export async function removeUserFromGroupConversation(req, res) {
  try {
    if (!req.body.memberId || !req.body.groupId) {
      return errorController.errorHandler(res, "Remove member from group must have memberId and groupId", 400);
    }
    const updatedConversation = await Conversation.findOneAndUpdate(
      { _id: req.body.groupId, members: { $in: req.user.id }, groupAdmin: { $in: req.user.id } },
      { $pull: { members: req.body.memberId } },
      { new: true }
    )
      .populate({
        path: "members",
        select: "_id fullName username avatar",
      })
      .populate({
        path: "lastMessage",
        select: "content createdAt",
        populate: {
          path: "sender",
          select: "fullName username avatar",
        },
      });
    if (!updatedConversation) {
      return errorController.errorHandler(res, "You are not an admin of this group", 400);
    }
    return res.status(200).json(updatedConversation);
  } catch (error) {
    return errorController.serverErrorHandler(error, res);
  }
}

// export async function deleteConversation(req, res) {
//   try {
//     if (!req.body.groupId) {
//       return errorController.errorHandler(res, "Delete conversation must have groupId", 400);
//     }
//     const deletedConversation = await Conversation.findOneAndDelete({
//       _id: req.body.groupId,
//       groupAdmin: req.user.id,
//     });
//   } catch (error) {
//     return errorController.serverErrorHandler(error, res);
//   }
// }
