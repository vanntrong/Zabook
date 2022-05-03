import { Router } from "express";

import * as storyController from "../controllers/storyController.js";
import { verifyToken } from "../controllers/middlewareController.js";

const router = Router();

router.post("/", verifyToken, storyController.createStoryHandler);

router.get("/", verifyToken, storyController.getStoryHandler);

router.get("/all", verifyToken, storyController.getAllStoriesHandler);

router.patch("/:storyId", verifyToken, storyController.viewStoryHandler);

router.delete("/:storyId", verifyToken, storyController.deleteStoryHandler);

export default router;
