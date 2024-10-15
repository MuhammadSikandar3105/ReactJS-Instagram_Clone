const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePictureUrl: {
    type: String, // You can also add validation here for the URL pattern if needed
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const user = mongoose.model('user', UserSchema);
module.exports = user;
