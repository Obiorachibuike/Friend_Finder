const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const User = require('./models/UserSchema');
const mongoose = require('mongoose');

const db = require("./utils/db");
const authRoutes = require("./routes/authRoutes");
const friendRoutes = require("./routes/friendRoutes");

const { authenticateUser } = require("./middleware/authMiddleware");

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:5174", // Replace with your frontend URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true, // Allows cookies to be sent
};

// Middleware
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

// Session management
app.use(
  session({
    secret: process.env.SECRET_KEY, // Secure secret from environment variables
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // Prevent access via JavaScript
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "Strict", // Restrict cookies to first-party context
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    },
  })
);

// Routes

app.use("/api/auth", authRoutes);

app.use("/api/friends", authenticateUser, friendRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message); // Log error message
  res
    .status(500)
    .json({ error: err.message || "An unexpected error occurred" });
});

// Database connection
const deleted = async () => {
  
  try {
    // Remove documents with null values for fields that should not be null
    await User.deleteMany({ username: null });
    console.log('Conflicting data removed successfully');
  } catch (err) {
    console.error('Error occurred while removing data:', err);
  } finally {
    await mongoose.disconnect();
  }
}

db.connection();
deleted()



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
