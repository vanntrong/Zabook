import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import * as errorController from "./errorController.js";

export function generateToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
  };

  const options = {
    expiresIn: "7d",
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export function generateRefreshToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
  };

  const options = {
    expiresIn: "20d",
  };

  return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, options);
}

const hashingPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

export async function registerHandler(req, res) {
  const data = { ...req.body };
  try {
    const existingUser = await User.findOne({ $or: [{ email: data.email }, { username: data.username }] });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }
    if (!existingUser) {
      const hashedPassword = hashingPassword(data.password);
      data.password = hashedPassword;
      const newUser = new User({ ...data });
      await newUser.save();
      res.status(201).json("Register Success");
    }
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function loginHandler(req, res) {
  const data = { ...req.body };
  try {
    const existingUser = await User.findOne({
      $or: [{ email: data.emailOrUsername }, { username: data.emailOrUsername }],
    });
    if (!existingUser) {
      res.status(404).json("No user with this email");
    }
    if (existingUser) {
      const isPasswordValid = comparePassword(data.password, existingUser.password);
      if (!isPasswordValid) {
        res.status(401).json("Invalid password");
      }
      if (isPasswordValid) {
        const { password, ...other } = existingUser._doc;
        const token = generateToken(existingUser);
        const refreshToken = generateRefreshToken(existingUser);
        res.status(200).json({ user: { ...other }, token, refreshToken });
      }
    }
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}
