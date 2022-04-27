import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import * as errorController from "./errorController.js";
import * as factoryController from "./factoryController.js";

export function generateToken(id) {
  const payload = {
    id,
  };

  const options = {
    expiresIn: "7d",
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

export function generateRefreshToken(id) {
  const payload = {
    id,
  };

  const options = {
    expiresIn: "20d",
  };

  return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, options);
}

export function hashingPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

export async function registerHandler(req, res) {
  const data = { ...req.body };
  try {
    //1. find user by username or email
    const existingUser = await factoryController.findOne(
      User,
      { $or: [{ email: data.email }, { username: data.username }] },
      null
    );
    //2. if user exists, return error
    if (existingUser) {
      return errorController.errorHandler(res, "User already exists", 400);
    }
    //3. if user does not exist, create user
    if (!existingUser) {
      const hashedPassword = hashingPassword(data.password);
      data.password = hashedPassword;
      factoryController.createOne(User, data, res);
    }
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function loginHandler(req, res) {
  const data = { ...req.body };
  try {
    //1. find user by username or email
    const existingUser = await factoryController.findOne(
      User,
      { $or: [{ email: data.emailOrUsername }, { username: data.emailOrUsername }] },
      null
    );
    //2. if user not exists, return error
    if (!existingUser) {
      return errorController.errorHandler(res, "Wrong username or password", 404);
    }
    //3. if user exists, check password
    if (existingUser) {
      const isPasswordValid = comparePassword(data.password, existingUser.password);
      if (!isPasswordValid) {
        return errorController.errorHandler(res, "Wrong username or password", 404);
      }
      if (isPasswordValid) {
        const { password, ...other } = existingUser._doc;
        const token = generateToken(existingUser._id);
        const refreshToken = generateRefreshToken(existingUser._id);
        res.status(200).json({ user: { ...other }, token, refreshToken });
      }
    }
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function changePasswordHandler(req, res) {
  try {
    const data = req.body;
    //check userId in params not equal to userId in token
    if (req.params.userId !== req.user.id) {
      return errorController.errorHandler(res, "You are not allow to change this user's password", 401);
    }
    //1. find user by params.userId
    const user = await factoryController.findOne(User, { _id: req.params.userId }, null);
    //2. if user not exists, return error
    if (!user) {
      return errorController.errorHandler(res, "No user with this id", 404);
    }
    //3. if user exists, check password
    const isPasswordValid = comparePassword(data.oldPassword, user.password);
    if (!isPasswordValid) {
      return errorController.errorHandler(res, "Invalid password", 404);
    }
    if (isPasswordValid) {
      const hashedPassword = hashingPassword(data.newPassword);
      user.password = hashedPassword;
      await user.save();
      res.status(200).json("Password changed");
    }
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}

export async function getUserHandler(req, res) {
  try {
    const user = await factoryController.findOne(User, { _id: req.user.id }, null);
    if (!user) {
      return errorController.errorHandler(res, "User not found", 404);
    }
    const { password, ...other } = user._doc;
    res.status(200).json({ ...other });
  } catch (error) {
    errorController.serverErrorHandler(error, res);
  }
}
