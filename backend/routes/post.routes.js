const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// CREATE POST (PROTECTED)
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { text, image } = req.body;

    // validation: at least one required
    if (!text && !image) {
      return res
        .status(400)
        .json({ message: "Post must contain text or image" });
    }

    // get logged-in user
    const user = await User.findById(req.userId);

    const newPost = new Post({
      userId: user._id,
      username: user.username,
      text: text || "",
      image: image || "",
    });

    await newPost.save();

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
});


// GET ALL POSTS (FEED)
router.get("/", async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: -1 });
  
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({
        message: "Failed to fetch posts",
        error: error.message,
      });
    }
  });
  

// LIKE / UNLIKE POST (PROTECTED)
router.post("/:id/like", authMiddleware, async (req, res) => {
    try {
      const postId = req.params.id;
  
      // get logged-in user
      const user = await User.findById(req.userId);
  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      const alreadyLiked = post.likes.includes(user.username);
  
      if (alreadyLiked) {
        // unlike
        post.likes = post.likes.filter(
          (username) => username !== user.username
        );
      } else {
        // like
        post.likes.push(user.username);
      }
  
      await post.save();
  
      res.status(200).json({
        message: alreadyLiked ? "Post unliked" : "Post liked",
        likesCount: post.likes.length,
        likes: post.likes,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to like post",
        error: error.message,
      });
    }
  });
  

// COMMENT ON POST (PROTECTED)
router.post("/:id/comment", authMiddleware, async (req, res) => {
    try {
      const postId = req.params.id;
      const { text } = req.body;
  
      if (!text) {
        return res.status(400).json({ message: "Comment text is required" });
      }
  
      const user = await User.findById(req.userId);
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      post.comments.push({
        username: user.username,
        text,
      });
  
      await post.save();
  
      res.status(200).json({
        message: "Comment added",
        commentsCount: post.comments.length,
        comments: post.comments,
      });
    } catch (error) {
      res.status(500).json({
        message: "Failed to add comment",
        error: error.message,
      });
    }
  });
 
  router.delete("/:id", authMiddleware, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      if (post.userId.toString() !== req.userId) {
        return res.status(403).json({ message: "Not authorized" });
      }
  
      await Post.findByIdAndDelete(req.params.id);
      res.json({ message: "Post deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;
