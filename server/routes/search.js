import express from "express";
import { verifyToken } from "../controllers/middlewareController.js";
import * as userController from "../controllers/userController.js";

const router = express.Router();

router.get("/", verifyToken, userController.searchUserHandler);

export default router;
