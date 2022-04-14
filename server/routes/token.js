import express from "express";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/token.js";

const router = express.Router();

router.post("/:refreshToken/refresh", (req, res) => {
  const refreshToken = req.params.refreshToken;
  if (!refreshToken) {
    return res.status(404).json({ message: "No refresh token" });
  }
  jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "Invalid refresh token" });
    const userNewToken = { _id: user.id, email: user.email };
    const accessToken = generateToken(userNewToken);
    res.status(200).json(accessToken);
  });
});

export default router;
