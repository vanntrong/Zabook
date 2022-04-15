import User from "../models/User.js";

export async function updateUserHandler(req, res) {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json("User not found");
    }
    if (user) {
      if (req.user.id !== user._id.toString()) {
        return res.status(403).json("You are not allowed to update this user");
      }
      const updatedUser = await User.findByIdAndUpdate(user.id, { $set: req.body }, { new: true });
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
}

export async function deleteUserHandler(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json("User not found");
    }
    if (user) {
      if (req.user.id !== user._id.toString()) {
        return res.status(403).json("You are not allowed to delete this user");
      }
      await User.findByIdAndDelete(user.id);
      res.status(200).json("User deleted");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
}

export async function getPostsHandler(req, res) {
  try {
    const userPost = await User.findById(req.params.userId).populate("posts");
    if (!userPost) {
      return res.status(404).json("Posts not found");
    }
    res.status(200).json(userPost.posts);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
}

export async function getUserHandler(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json("User not found");
    }
    const { password, ...other } = user._doc;
    res.status(200).json({ ...other });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
}

export async function getFriendProfileHandler(req, res) {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const { password, ...other } = user._doc;
    res.status(200).json({ ...other });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
}

export async function addAndRemoveFriendHandler(req, res) {
  try {
    //find user
    const currentUser = await User.findById(req.params.userId);
    if (!currentUser) {
      return res.status(404).json("User not found");
    }
    if (req.user.id !== currentUser._id.toString()) {
      return res.status(403).json("You are not allowed to add or remove friend");
    }
    const friend = await User.findById(req.body.friendId);
    if (!friend) {
      return res.status(404).json("Friend not found");
    }
    //if friend is not in current user's friend list
    if (!currentUser.friends.includes(friend._id.toString())) {
      await currentUser.updateOne({ $push: { friends: friend._id } });
      await friend.updateOne({ $push: { friends: currentUser._id } });
      res.status(200).json("Friend added");
    }
    //if friend is in current user's friend list
    if (currentUser.friends.includes(friend._id.toString())) {
      await currentUser.updateOne({ $pull: { friends: friend._id } });
      await friend.updateOne({ $pull: { friends: currentUser._id } });
      res.status(200).json("Friend removed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
}

// export async function searchUserHandler(req, res) {
//   try {
//     const se
//   } catch (error) {

//   }
// }
