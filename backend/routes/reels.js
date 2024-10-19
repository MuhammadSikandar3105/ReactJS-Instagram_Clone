const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fetchuser = require('../middleware/fetchuser');
const Reel = require('../models/Reels'); // Import the reels model
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

// ROUTE 1: Get all the Reels for the logged-in user using: GET "/api/reels/fetchallreels". Login required
router.get('/fetchallreels', async (req, res) => {
    try {
        // Fetch all reels and populate user details
        const reels = await Reel.find({}).populate('user', 'name'); // specify the fields you want to populate
        res.json(reels);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE 3: Add a new Reel using: POST "/api/reels/addreel". Login required
router.post('/addreel', fetchuser, upload.single('file'), [
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
  
        // Create a new Reel object
        const reel = new Reel({
            fileUrl: req.file ? `/uploads/${req.file.filename}` : '', // Store the relative path to the file
            caption,
            user: req.user.id // Access user id here
        });
  
        const savedReel = await reel.save();
        res.json(savedReel);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
  });

// ROUTE 4: Update an existing Reel using: PUT "/api/reels/updatereel/:id". Login required
router.put('/updatereel/:id', fetchuser, upload.single('file'), async (req, res) => {
    const { caption, hashtags, songDetail } = req.body;
    try {
        const updatedReel = {};
        if (caption) updatedReel.caption = caption;
        if (hashtags) updatedReel.hashtags = hashtags.split(','); // Update hashtags
        if (songDetail) updatedReel.songDetail = songDetail; // Update song detail

        // Check if a new file is uploaded
        if (req.file) {
            updatedReel.fileUrl = `/uploads/${req.file.filename}`;
        }

        // Find the reel to be updated and update it
        let reel = await Reel.findById(req.params.id);
        if (!reel) { return res.status(404).send("Not Found") }

        // Allow update only if the logged-in user owns the reel
        if (reel.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        reel = await Reel.findByIdAndUpdate(req.params.id, { $set: updatedReel }, { new: true });
        res.json({ reel });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE 5: Delete an existing Reel using: DELETE "/api/reels/deletereel/:id". Login required
router.delete('/deletereel/:id', fetchuser, async (req, res) => {
    try {
        // Find the reel to be deleted
        let reel = await Reel.findById(req.params.id);
        if (!reel) { return res.status(404).send("Not Found") }

        // Allow deletion only if the logged-in user owns the reel
        if (reel.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Delete the reel
        reel = await Reel.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Reel has been deleted", reel: reel });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
