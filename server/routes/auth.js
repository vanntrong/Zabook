import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();

// register
router.post("/register", authController.registerHandler);

//login
router.post("/login", authController.loginHandler);

export default router;
