const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema.js');

// Middleware to authenticate users
const authenticateUser = async (req, res, next) => {
  try {
    // Check if a session exists
    if (req.session && req.session.user) {
      // Attach user to the request object from the session
      req.user = req.session.user;
      return next();
    }

    // Extract token from cookies if not authenticated via session
    const token = req.cookies['authToken']; // Ensure this matches the cookie name used

    // Check if token exists
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from decoded token
    const user = await User.findById(decoded.id);

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized because Invalid token' });
    }

    // Attach user to the request object
    req.user = user;

    // Also set the session user
    req.session.user = user;

    next();
  } catch (error) {
    // Catch any errors and respond with a 401 status
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Middleware to authenticate admin users
const authenticateAdmin = async (req, res, next) => {
  // First, authenticate the user
  await authenticateUser(req, res, () => {
    // Check if the user has admin role
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  });
};

// Middleware to get user data from session
const getUserFromSession = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user; // Attach user data to req object
  } else {
    req.user = null; // No user data in session
  }
  next();
};


module.exports = { authenticateUser, authenticateAdmin, getUserFromSession};
