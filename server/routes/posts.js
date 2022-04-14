import express from "express";
import * as postHandler from "../controllers/postController.js";
import { verifyToken } from "../controllers/middlewareController.js";

const router = express.Router();

// create new post
router.post("/", verifyToken, postHandler.createPostHandler);

//get post by id
router.get("/:postId", verifyToken, postHandler.getPostHandler);

//update post
router.put("/:postId", verifyToken, postHandler.updatePostHandler);

//delete post
router.delete("/:postId", verifyToken, postHandler.deletePostHandler);

export default router;
