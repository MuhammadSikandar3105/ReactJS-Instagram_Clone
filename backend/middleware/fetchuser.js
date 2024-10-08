const jwt = require('jsonwebtoken');
const JWT_SECRET = "sikandarisagoodb$oy"; // Ensure this is kept secure

const fetchuser = (req, res, next) => {
    // Get the user from JWT token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: 'Please authenticate a valid token' });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user; // Assuming the token payload includes { user: { _id: ... } }
        console.log("Decoded user:", req.user); // Log the user information for debugging
        next();
    } catch (error) {
        console.error("Token verification error:", error.message); // Log error for debugging
        return res.status(401).send({ error: 'Please authenticate a valid token' });
    }
};

module.exports = fetchuser;

