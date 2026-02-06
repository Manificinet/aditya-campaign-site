const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[0-9\-\+\s]{7,15}$/, 'Please provide a valid phone number']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    maxlength: [200, 'Address cannot exceed 200 characters']
  },
  helpType: {
    type: String,
    required: [true, 'Please select how you can help'],
    enum: {
      values: ['campaigning', 'social_media', 'event', 'donation', 'other'],
      message: '{VALUE} is not a valid option'
    }
  },
  language: {
    type: String,
    enum: ['ne', 'en'],
    default: 'ne'
  },
  ipAddress: {
    type: String,
    select: false // Do not return by default
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Volunteer', volunteerSchema);
