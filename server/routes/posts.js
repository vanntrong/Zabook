import express from "express";
import * as postHandler from "../controllers/postController.js";
import { verifyToken } from "../controllers/middlewareController.js";

const router = express.Router();

// create new post
router.post("/", verifyToken, postHandler.createPostHandler);

//get user post
// router.get("/:userId/posts", verifyToken, postHandler.getUserPostsHandler);

//get post by id
router.get("/:postId", verifyToken, postHandler.getPostHandler);

//update post
router.put("/:postId", verifyToken, postHandler.updatePostHandler);

//delete post
router.delete("/:postId", verifyToken, postHandler.deletePostHandler);

//like post
router.patch("/:postId/like", verifyToken, postHandler.likePostHandler);

router.put("/:postId/audience", verifyToken, postHandler.updateAudienceHandler);

//create comment
router.post("/:postId/comment", verifyToken, postHandler.createCommentHandler);

//get comment
router.get("/:postId/comments", verifyToken, postHandler.getCommentsHandler);

//update comment
router.put("/comment/:commentId", verifyToken, postHandler.updateCommentHandler);

//delete comment
router.delete("/comment/:commentId", verifyToken, postHandler.deleteCommentHandler);

export default router;
