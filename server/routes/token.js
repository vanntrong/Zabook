import express from "express";
import jwt from "jsonwebtoken";
import { generateToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/:refreshToken/refresh", (req, res) => {
  const refreshToken = req.params.refreshToken;
  if (!refreshToken) {
    return res.status(404).json({ message: "No refresh token" });
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "Invalid refresh token" });
    const accessToken = generateToken(user.id);
    res.status(200).json(accessToken);
  });
});

export default router;
