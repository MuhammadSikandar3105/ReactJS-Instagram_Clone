const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fetchuser = require('../middleware/fetchuser');
const Story = require('../models/Stories');
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

// ROUTE 1: Get all the Stories for the logged-in user using: GET "/api/stories/fetchallstories". Login required
router.get('/fetchallstories', async (req, res) => {
    try {
        // Fetch all stories for the logged-in user and populate the user details
        const stories = await Story.find({}).populate('user', 'name'); // specify the fields you want to populate
        res.json(stories);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 2: Add a new Story using: POST "/api/stories/addstory". Login required
// Add the fetchuser middleware to the route
router.post('/addstory', fetchuser, upload.single('file'), [
  body('caption', 'Caption must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
  console.log('Incoming request:', req.body);
  try {
      const { caption } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      // Create a new Story object
      const story = new Story({
          fileUrl: req.file ? `/uploads/${req.file.filename}` : '', // Store the relative path to the file
          caption,
          user: req.user.id // Access user id here
      });

      const savedStory = await story.save();
      res.json(savedStory);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
});


// ROUTE 3: Update an existing Story using: PUT "/api/stories/updatestory/:id". Login required
router.put('/updatestory/:id', fetchuser, upload.single('file'), async (req, res) => {
    const { caption } = req.body;
    try {
        const updatedStory = {};
        if (caption) updatedStory.caption = caption;

        // Check if a new file is uploaded
        if (req.file) {
            updatedStory.fileUrl = `/uploads/${req.file.filename}`;
        }

        // Find the story to be updated and update it
        let story = await Story.findById(req.params.id);
        if (!story) { return res.status(404).send("Not Found") }

        // Allow update only if the logged-in user owns the story
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

// ROUTE 4: Delete an existing Story using: DELETE "/api/stories/deletestory/:id". Login required
router.delete('/deletestory/:id', fetchuser, async (req, res) => {
    try {
        // Find the story to be deleted
        let story = await Story.findById(req.params.id);
        if (!story) { return res.status(404).send("Not Found") }

        // Allow deletion only if the logged-in user owns the story
        if (story.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Delete the story
        story = await Story.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Story has been deleted", story: story });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
