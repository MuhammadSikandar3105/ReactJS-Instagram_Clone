const mongoose = require('mongoose');
const { Schema } = mongoose;

const StoriesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    fileUrl: {
        type: String, // To store the file URL (either image or video)
        required: false
    },
    caption: {
        type: String,
        required: true // Caption of the post
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId, // Users who liked the post
        ref: 'user'
    }],
    reply: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        replyText: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    direct: {
        type: Number, // Number of times the post has been shared
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('stories', StoriesSchema);
