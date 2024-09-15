const express = require("express");
const {
  getFriends,
  searchUsers,
  sendFriendRequest,
} = require("../controllers/friendController.js");
const { addFriend } = require("../controllers/friendController.js");
const { acceptFriendRequest } = require("../controllers/friendController.js");
const {
  getFriendsAndRecommendations,
} = require("../controllers/friendController.js");
const router = express.Router();

router.get("/list", getFriends);
router.get("/search", searchUsers);
router.post("/request/:id", sendFriendRequest);
router.post("/add", addFriend);
router.post("/accept", acceptFriendRequest);
router.get("/", getFriendsAndRecommendations);

module.exports = router;
