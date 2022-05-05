import express from "express";
import { verifyToken } from "../controllers/middlewareController.js";
import * as messageController from "../controllers/messageController.js";
const router = express.Router();

router.get("/:conversationId", verifyToken, messageController.getMessages);

router.post("/", verifyToken, messageController.createMessage);

router.put("/", verifyToken, messageController.deleteMessage);

export default router;
