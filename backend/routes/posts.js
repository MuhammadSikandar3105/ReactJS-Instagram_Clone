const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fetchuser = require('../middleware/fetchuser');
const Post = require('../models/Post');
const { body, validationResult } = require('express-validator');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads')); // Ensure this path is correct
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

// ROUTE 1: Get All the Posts using: GET "/api/posts/fetchallposts". Login required
router.get('/fetchallposts', async (req, res) => {
    try {
        // Fetch all posts from the database
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2 for profile posts authentication required
router.get('/fetchalluserposts', fetchuser, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id });
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a new Post using: POST "/api/posts/addpost". Login required, image upload
router.post('/addpost', fetchuser, upload.single('image'), [
    body('caption', 'Caption must be at least 5 characters').isLength({ min: 5 }),
    body('hashtags', 'Hashtags should be an array of strings').isArray()
], async (req, res) => {
    try {
        const { caption, location, hashtags } = req.body;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create a new post with the image path
        const post = new Post({
            imageUrl: req.file ? `/uploads/${req.file.filename}` : '', // Store relative path
            caption,
            location,
            hashtags,
            user: req.user.id
        });
        console.log('File:', req.file);
        console.log('Body:', req.body);

        const savedPost = await post.save();

        res.json(savedPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Update an existing Post using: PUT "/api/posts/updatepost/:id". Login required, image upload
router.put('/updatepost/:id', fetchuser, upload.single('image'), async (req, res) => {
    const { caption, location, hashtags } = req.body;
    try {
        // Create a newPost object
        const updatedPost = {};
        if (req.file) { updatedPost.imageUrl = req.file.path }; // Update image if a new one is uploaded
        if (caption) { updatedPost.caption = caption };
        if (location) { updatedPost.location = location };
        if (hashtags) { updatedPost.hashtags = hashtags };

        // Find the post to be updated and update it
        let post = await Post.findById(req.params.id);
        if (!post) { return res.status(404).send("Not Found") }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        post = await Post.findByIdAndUpdate(req.params.id, { $set: updatedPost }, { new: true });
        res.json({ post });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 4: Delete an existing Post using: DELETE "/api/posts/deletepost/:id". Login required
router.delete('/deletepost/:id', fetchuser, async (req, res) => {
    try {
        // Find the post to be deleted and delete it
        let post = await Post.findById(req.params.id);
        if (!post) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Post
        if (post.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        post = await Post.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Post has been deleted", post: post });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
