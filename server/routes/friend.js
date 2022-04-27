import { application, Router } from "express";
import * as friendRequestController from "../controllers/friendRequestController.js";
import { verifyToken } from "../controllers/middlewareController.js";

const router = Router();

router.post("/request", verifyToken, friendRequestController.createFriendRequestHandler);

router.put("/accept/:requestId", verifyToken, friendRequestController.acceptFriendRequestHandler);

router.put("/decline/:requestId", verifyToken, friendRequestController.declineFriendRequestHandler);

router.delete("/", verifyToken, friendRequestController.deleteFriendRequestHandler);

router.get("/request", verifyToken, friendRequestController.getFriendRequestHandler);

router.get("/request/all", verifyToken, friendRequestController.getAllFriendRequestHandler);

export default router;
