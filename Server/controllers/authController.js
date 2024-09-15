const { body, validationResult } = require("express-validator");
const User = require("../models/UserSchema.js");
const sendMail = require("../utils/nodeMailer.js");
const bcrypt = require("bcrypt")

// User Signup
const signup = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({ name, email, password: hashedPassword });

      await user.save();

      res.status(201).json({
        message: 'User created successfully. Please verify your email.',
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error)
    }
  },
];

// User Login
const login = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      if (!user.isVerified) {
        return res.status(401).json({ error: "Email not verified" });
      }

      const token = user.generateToken();

      // Store user data in session
      req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      });

     
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];









// Logout
const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: "Error logging out" });
    res.clearCookie("authToken"); // Clear auth token cookie
    res.status(200).json({ message: "Logout successful" });
  });
};

module.exports = { signup, login,logout };



