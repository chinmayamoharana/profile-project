const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    default: 'default' // Since it's a single user profile app essentially
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Full Stack Developer'
  },
  bio: {
    type: String,
    default: ''
  },
  profileImage: {
    type: String,
    default: '/profile_photo.jpeg'
  },
  socialLinks: {
    linkedin: String,
    github: String,
    twitter: String,
    website: String
  },
  skills: [{
    name: String,
    endorsements: {
      type: Number,
      default: 0
    }
  }],
  experience: [{
    role: String,
    company: String,
    duration: String,
    description: String
  }],
  themePreference: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
