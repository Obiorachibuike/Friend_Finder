const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    // Ensure that the user making the request is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Create a new post with the provided title, content, and author from req.user
    const newPost = new Post({
      title,
      content,
      author: req.user._id // Use req.user._id to associate the post with the authenticated admin
    });

    // Save the post to the database
    await newPost.save();

    // Optionally, update the user document to include the new post ID in the user's posts array
    const user = await User.findById(req.user._id);
    if (user) {
      user.posts.push(newPost._id);
      await user.save();
    }

    // Respond with the created post
    res.status(201).json(newPost);
  } catch (err) {
    // Handle errors
    res.status(400).json({ error: err.message });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    // Ensure that the user making the request is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Delete the post from the database
    await Post.findByIdAndDelete(id);

    // Optionally, remove the post ID from the user's posts array
    const user = await User.findById(req.user._id);
    if (user) {
      user.posts.pull(id);
      await user.save();
    }

    // Respond with a success message
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    // Handle errors
    res.status(400).json({ error: err.message });
  }
};

// Update a post
const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    // Ensure that the user making the request is an admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Update the post's title and/or content
    post.title = title || post.title;
    post.content = content || post.content;

    // Save the updated post
    await post.save();

    // Respond with the updated post
    res.status(200).json(post);
  } catch (err) {
    // Handle errors
    res.status(400).json({ error: err.message });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    // Retrieve all posts from the database and populate the author field
    const posts = await Post.find().populate('author', 'username');
    res.status(200).json(posts);
  } catch (err) {
    // Handle errors
    res.status(400).json({ error: err.message });
  }
};

// Get a single post by ID
const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the post by ID and populate the author field
    const post = await Post.findById(id).populate('author', 'username');
    if (!post) return res.status(404).json({ error: 'Post not found' });

    // Respond with the found post
    res.status(200).json(post);
  } catch (err) {
    // Handle errors
    res.status(400).json({ error: err.message });
  }
};
