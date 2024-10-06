const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    imageUrl: {
        type: String, // To store the image URL for the post
        required: false
    },
    caption: {
        type: String,
        required: true // Caption of the post
    },
    location: {
        type: String, // e.g., Rahim Yar Khan
        default: ''
    },
    hashtags: [{
        type: String // To store hashtags used in the post
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId, // Users who liked the post
        ref: 'user'
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        commentText: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    shares: {
        type: Number, // Number of times the post has been shared
        default: 0
    },
    isFavorited: [{
        type: mongoose.Schema.Types.ObjectId, // Users who favorited the post
        ref: 'user'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('posts', PostsSchema);
