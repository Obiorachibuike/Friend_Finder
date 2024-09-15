const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequestsSent: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendRequest",
      },
    ],
    friendRequestsReceived: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FriendRequest",
      },
    ],
    interests: [
      {
        type: String,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Pre-save Hook: Hash password before saving to the database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare password for authentication
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

// Generate JWT token for authentication
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = mongoose.model("User", userSchema);
