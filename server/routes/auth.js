import express from "express";
import * as authController from "../controllers/authController.js";
import { verifyToken } from "../controllers/middlewareController.js";

const router = express.Router();

// register
router.post("/register", authController.registerHandler);

//login
router.post("/login", authController.loginHandler);

//change password
router.put("/:userId/password", verifyToken, authController.changePasswordHandler);

//get profile
router.get("/", verifyToken, authController.getUserHandler);

export default router;
