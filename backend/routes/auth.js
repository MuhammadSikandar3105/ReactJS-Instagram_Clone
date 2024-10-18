const express = require('express');
const path = require('path');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const multer = require('multer'); // For handling file uploads


const JWT_SECRET = "sikandarisagoodb$oy";

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

// Route 1: Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', upload.single('profilepicture'), [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    let success = false;

    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    
    // Check whether the user with email exists already
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: "Sorry, a user already exists with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Prepare user data with optional profile picture
        const newUser = {
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        };

        // If a profile picture is uploaded, include the file path
        if (req.file) {
            newUser.proUrl = `/uploads/${req.file.filename}`;
        }

        // Create new user
        user = await User.create(newUser);

        const data = {
            user: {
                id: user.id
            }
        };

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

// Route 2: Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false;

    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 3: Get user details using: GET "/api/auth/getuser". Login required
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 4: Update profile picture: POST "/api/auth/updateprofilepicture". Login required
router.put('/updateprofilepicture/:id', fetchuser, upload.single('profilepicture'), async (req, res) => {
    const { name, email } = req.body;
    
    try {
        // Initialize an object to hold the updates for the user profile
        const updatedProfile = {};
        
        // Check if a new name or email is provided in the request body
        if (name) updatedProfile.name = name;
        if (email) updatedProfile.email = email;

        // Check if a new profile picture file is uploaded
        if (req.file) {
            updatedProfile.proUrl = `/uploads/${req.file.filename}`; // Store the file path
        }

        // Find the user by the ID in the URL parameter
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send("User Not Found");
        }

        // Ensure that the logged-in user is updating their own profile
        if (user.id.toString() !== req.user.id) {
            return res.status(401).send("Not Authorized to update this profile");
        }

        // Update the user profile with the new data
        user = await User.findByIdAndUpdate(
            req.user.id, 
            { $set: updatedProfile }, 
            { new: true }
        )

        // Respond with the updated user profile
        res.json({ 
            success: true, 
            message: "Profile updated successfully", 
            user 
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});



// Route 5: Logout a user using: POST "/api/auth/logout". Login required
router.post('/logout', fetchuser, (req, res) => {
    try {
        res.json({ success: true, message: "User has been logged out, please clear the token on the client-side." });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
