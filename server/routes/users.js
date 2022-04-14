import express from "express";
import { verifyToken } from "../controllers/middlewareController.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

// register
router.post("/register", userController.registerHandler);

//login
router.post("/login", userController.loginHandler);

//update
router.put("/:userId", verifyToken, userController.updateUserHandler);

//delete
router.delete("/:userId", verifyToken, userController.deleteUserHandler);

//get post of user
router.get("/:userId/posts", verifyToken, userController.getPostsHandler);

//get profile
router.get("/", verifyToken, userController.getUserHandler);

//get profile friend
router.get("/:username", verifyToken, userController.getFriendProfileHandler);

//add and remove friends
router.put("/:userId/friends", verifyToken, userController.addAndRemoveFriendHandler);

export default router;
