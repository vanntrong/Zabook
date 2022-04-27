import express from "express";
import { verifyToken } from "../controllers/middlewareController.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

//update
router.put("/:userId", verifyToken, userController.updateUserHandler);

//delete
router.delete("/:userId", verifyToken, userController.deleteUserHandler);

//get post of user
router.get("/:userId/posts", verifyToken, userController.getPostsHandler);

//get profile friend
router.get("/:username/profile", verifyToken, userController.getOtherUserProfileHandler);

//get Friend List
router.get("/:userId/friends", verifyToken, userController.getFriendListHandler);

//add user to searchHistory
router.put("/:userId/searchHistory", verifyToken, userController.addHistorySearchHandler);

//get searchHistory info
router.get("/:userId/searchHistory", verifyToken, userController.getHistoryInfo);

//delete searchHistory
router.delete("/:userId/searchHistory/:historyId", verifyToken, userController.deleteHistoryHandler);
export default router;
