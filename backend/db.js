const mongoose = require('mongoose');
const mongoUri = "mongodb://localhost:27017/instagram";

const connectedToMongo = async () => {
    try {
        await mongoose.connect(mongoUri); // Removed deprecated options
        console.log('Connected to mongo successfully');
    } catch (error) {
        console.error('Error connecting to mongo:', error);
    }
};

module.exports = connectedToMongo;
