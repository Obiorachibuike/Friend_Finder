const express = require('express');
const router = express.Router();
const {
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
  getPostById
} = require('../controllers/Admin');
const { authenticateAdmin } = require('../middleware/authMiddleware'); // Ensure admin authentication

// Route to create a new post
router.post('/posts', authenticateAdmin, createPost);

// Route to delete a post
router.delete('/posts/:id', authenticateAdmin, deletePost);

// Route to update a post
router.put('/posts/:id', authenticateAdmin, updatePost);

// Route to get all posts
router.get('/posts', getAllPosts);

// Route to get a single post by ID
router.get('/posts/:id', getPostById);

module.exports = router;
