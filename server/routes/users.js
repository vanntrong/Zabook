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

//get Friend post
router.get("/:userId/friends/posts", verifyToken, userController.getFriendPostHandler);

//add user to searchHistory
router.put("/:userId/searchHistory", verifyToken, userController.addHistorySearchHandler);

//get searchHistory info
router.get("/:userId/searchHistory", verifyToken, userController.getHistoryInfo);

//delete searchHistory
router.delete("/:userId/searchHistory/:historyId", verifyToken, userController.deleteHistoryHandler);

//delete friend
router.delete("/:userId/friends/:friendId", verifyToken, userController.deleteFriendHandler);

//get user online
router.post("/online", verifyToken, userController.getOnlineHandler);

router.get("/suggest", verifyToken, userController.getSuggestionHandler);

export default router;
