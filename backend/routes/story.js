const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Story = require('../models/Stories');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads with file type validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Directory where the files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Create a unique file name
  }
});

// Filter to allow only images or videos
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|mp4|mkv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Only images and videos are allowed');
  }
};

// Set up multer middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// ROUTE 1: Get All the stories using: GET "/api/posts/fetchallstory". Login required
router.get('/fetchallstory', fetchuser, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id });
    res.json(stories);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new Story with an image or video using: POST "/api/posts/addstory". Login required
router.post('/addstory', fetchuser, upload.single('file'), [
  body('caption', 'Caption must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
  try {
    const { caption } = req.body;

    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Get the file URL (either image or video)
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (fileUrl) {
      return res.status(400).json({ error: "File is required" });
    }

    const story = new Story({
      fileUrl,   // Store the file URL
      caption,
      user: req.user.id
    });

    const savedStory = await story.save();

    res.json(savedStory);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 3: Update an existing Story using: PUT "/api/posts/updatestory/:id". Login required
router.put('/updatestory/:id', fetchuser, upload.single('file'), async (req, res) => {
  const { caption } = req.body;
  try {
    const updatedStory = {};
    if (caption) updatedStory.caption = caption;

    // Check if a new file is uploaded
    if (req.file) {
      updatedStory.fileUrl = `/uploads/${req.file.filename}`;
    }

    let story = await Story.findById(req.params.id);
    if (!story) {
      return res.status(404).send("Not Found");
    }

    if (story.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    story = await Story.findByIdAndUpdate(req.params.id, { $set: updatedStory }, { new: true });
    res.json({ story });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4: Delete an existing Story using: DELETE "/api/posts/deletestory/:id". Login required
router.delete('/deletestory/:id', fetchuser, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id);
    if (!story) { return res.status(404).send("Not Found") }

    if (story.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    story = await Story.findByIdAndDelete(req.params.id);
    res.json({ "Success": "Story has been deleted", story: story });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
