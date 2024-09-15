const User = require("../models/UserSchema");

// Get Friends List
const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate(
      "friends",
      "username"
    );
    res.json(user.friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search Users
const searchUsers = async (req, res) => {
  const { query } = req.query;
  try {
    const users = await User.find({ username: new RegExp(query, "i") }).select(
      "username"
    );
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send Friend Request
const sendFriendRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const friend = await User.findById(req.params.id);

    if (friend) {
      friend.friendRequests.push(user._id);
      await friend.save();
      res.json({ message: "Friend request sent" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addFriend = async (req, res) => {
  const { friendId } = req.body;
  try {
    const user = await User.findById(req.session.user._id);
    const friend = await User.findById(friendId);
    if (!friend || user.friends.includes(friend._id)) {
      return res
        .status(400)
        .json({ message: "Friend request cannot be processed" });
    }
    user.pendingRequests.push(friend._id);
    friend.friendRequests.push(user._id);
    await user.save();
    await friend.save();
    res.status(200).json({ message: "Friend request sent" });
  } catch (error) {
    res.status(400).json({ message: "Error sending friend request", error });
  }
};

// Accept Friend Request
const acceptFriendRequest = async (req, res) => {
  const { friendId } = req.body;
  try {
    const user = await User.findById(req.session.user._id);
    const friend = await User.findById(friendId);
    if (!friend || !user.friendRequests.includes(friend._id)) {
      return res
        .status(400)
        .json({ message: "Friend request cannot be accepted" });
    }
    user.friends.push(friend._id);
    friend.friends.push(user._id);
    user.friendRequests = user.friendRequests.filter(
      (id) => id.toString() !== friend._id.toString()
    );
    friend.pendingRequests = friend.pendingRequests.filter(
      (id) => id.toString() !== user._id.toString()
    );
    await user.save();
    await friend.save();
    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    res.status(400).json({ message: "Error accepting friend request", error });
  }
};

// Get Friends List and Recommendations
const getFriendsAndRecommendations = async (req, res) => {
  try {
    const user = await User.findById(req.session.user._id).populate("friends");
    const mutualFriends = await User.aggregate([
      { $match: { _id: { $nin: user.friends, $ne: user._id } } },
      {
        $project: {
          mutualFriends: {
            $size: { $setIntersection: ["$friends", user.friends] },
          },
        },
      },
      { $sort: { mutualFriends: -1 } },
    ]);
    res
      .status(200)
      .json({ friends: user.friends, recommendations: mutualFriends });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching friends and recommendations", error });
  }
};

module.exports = {
  sendFriendRequest,
  searchUsers,
  getFriends,
  addFriend,
  acceptFriendRequest,
  getFriendsAndRecommendations,
};
