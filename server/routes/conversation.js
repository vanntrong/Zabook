import express from "express";

import { verifyToken } from "../controllers/middlewareController.js";
import * as conversationController from "../controllers/conversationController.js";

const router = express.Router();

router.get("/", verifyToken, conversationController.getConversations);

router.post("/", verifyToken, conversationController.createConversation);

router.post("/group", verifyToken, conversationController.createGroupConversation);

router.put("/group/rename", verifyToken, conversationController.renameGroupConversation);

router.put("/group/add", verifyToken, conversationController.addUserToGroupConversation);

router.put("/group/remove", verifyToken, conversationController.removeUserFromGroupConversation);

router.put("/group/avatar", verifyToken, conversationController.setGroupConversationAvatar);

// router.delete("/", verifyToken, conversationController.deleteConversation);

export default router;
