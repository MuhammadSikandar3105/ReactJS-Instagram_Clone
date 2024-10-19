const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReelsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    fileUrl: {
        type: String, // URL to the reel video
        required: true
    },
    caption: {
        type: String, // Caption for the reel
        required: true
    },
    hashtags: [{
        type: String, // Hashtags related to the reel
    }],
    songDetail: {
        title: {
            type: String, // Song title
            required: false
        },
        thumbnail: {
            type: String, // URL to the song's thumbnail or audio image
            required: false
        }
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId, // Users who liked the reel
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
        type: Number, // Number of times the reel has been shared
        default: 0
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId, // Users who favorited the reel
        ref: 'user'
    }],
    profile: {
        profileImage: {
            type: String, // URL to the profile image of the user who posted the reel
            required: false
        },
        username: {
            type: String, // Username of the user
            required: false
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('reels', ReelsSchema);
