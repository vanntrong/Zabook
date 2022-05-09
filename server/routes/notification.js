import { Router } from "express";
import { verifyToken } from "../controllers/middlewareController.js";
import * as notificationController from "../controllers/notificationController.js";

const router = Router();

router.get("/", verifyToken, notificationController.getAllNotifications);

router.post("/", verifyToken, notificationController.createNotification);

router.put("/", verifyToken, notificationController.seenNotification);

router.put("/all", verifyToken, notificationController.seenAllNotifications);

router.delete("/:id", verifyToken, notificationController.deleteNotification);

export default router;
