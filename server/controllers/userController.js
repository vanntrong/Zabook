import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken, generateRefreshToken } from "../utils/token.js";

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
      return res.status(400).json({
        message: "User already exists",
      });
    }
    if (!existingUser) {
      const hashedPassword = hashingPassword(data.password);
      data.password = hashedPassword;
      const newUser = new User({ ...data });
      await newUser.save();
      res.status(201).json({ message: "Register Success" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function loginHandler(req, res) {
  const data = { ...req.body };
  try {
    const existingUser = await User.findOne({
      $or: [{ email: data.emailOrUsername }, { username: data.emailOrUsername }],
    });
    if (!existingUser) {
      res.status(404).json({ message: "No user with this email" });
    }
    if (existingUser) {
      const isPasswordValid = comparePassword(data.password, existingUser.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Invalid password" });
      }
      if (isPasswordValid) {
        const { password, ...other } = existingUser._doc;
        const token = generateToken(existingUser);
        const refreshToken = generateRefreshToken(existingUser);

        // res.cookie("refresh_token", refreshToken, {
        //   httpOnly: true,
        //   sameSite: "strict",
        //   secure: false,
        //   path: "/",
        // });
        res.status(200).json({ user: { ...other }, token, refreshToken });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateUserHandler(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user) {
      if (req.user.id !== user._id.toString()) {
        return res.status(403).json({ message: "You are not allowed to update this user" });
      }
      const updatedUser = await User.findByIdAndUpdate(user.id, { $set: req.body }, { new: true });
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteUserHandler(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user) {
      if (req.user.id !== user._id.toString()) {
        return res.status(403).json({ message: "You are not allowed to delete this user" });
      }
      await User.findByIdAndDelete(user.id);
      res.status(200).json({ message: "User deleted" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getPostsHandler(req, res) {
  try {
    const userPost = await User.findById(req.params.userId).populate("posts");
    if (!userPost) {
      return res.status(404).json({ message: "Posts not found" });
    }
    res.status(200).json(userPost.posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getUserHandler(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...other } = user._doc;
    res.status(200).json({ ...other });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getFriendProfileHandler(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...other } = user._doc;
    res.status(200).json({ ...other });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function addAndRemoveFriendHandler(req, res) {
  try {
    //find user
    const currentUser = await User.findById(req.params.userId);
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.user.id !== currentUser._id.toString()) {
      return res.status(403).json({ message: "You are not allowed to add or remove friend" });
    }
    const friend = await User.findById(req.body.friendId);
    if (!friend) {
      return res.status(404).json({ message: "Friend not found" });
    }
    //if friend is not in current user's friend list
    if (!currentUser.friends.includes(friend._id.toString())) {
      await currentUser.updateOne({ $push: { friends: friend._id } });
      await friend.updateOne({ $push: { friends: currentUser._id } });
      res.status(200).json({ message: "Friend added" });
    }
    //if friend is in current user's friend list
    if (currentUser.friends.includes(friend._id.toString())) {
      await currentUser.updateOne({ $pull: { friends: friend._id } });
      await friend.updateOne({ $pull: { friends: currentUser._id } });
      res.status(200).json({ message: "Friend removed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
