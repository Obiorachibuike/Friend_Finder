const express = require("express");
const {
  login,
  signup,
  logout,
} = require("../controllers/authController.js");


const router = express.Router();

// Define routes
router.post("/login", login);
router.post("/signup", signup);

router.post("/logout", logout);

module.exports = router;
