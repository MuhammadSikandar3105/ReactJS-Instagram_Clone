const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser'); 
const Post = require('../models/Post'); 
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Posts using: GET "/api/posts/fetchallposts". Login required
router.get('/fetchallposts', fetchuser, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id });
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 2: Add a new Post using: POST "/api/posts/addpost". Login required
router.post('/addpost', fetchuser, [
    body('imageUrl', 'Enter a valid image URL').isURL(),
    body('caption', 'Caption must be at least 5 characters').isLength({ min: 5 }),
    body('hashtags', 'Hashtags should be an array of strings').isArray()
], async (req, res) => {
    try {
        const { imageUrl, caption, location, hashtags } = req.body;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const post = new Post({
            imageUrl,
            caption,
            location,
            hashtags,
            user: req.user.id
        });

        const savedPost = await post.save();

        res.json(savedPost);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 3: Update an existing Post using: PUT "/api/posts/updatepost/:id". Login required
router.put('/updatepost/:id', fetchuser, async (req, res) => {
    const { imageUrl, caption, location, hashtags } = req.body;
    try {
        // Create a newPost object
        const updatedPost = {};
        if (imageUrl) { updatedPost.imageUrl = imageUrl };
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
