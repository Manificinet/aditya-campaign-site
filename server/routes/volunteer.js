const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const formLimiter = require('../middleware/rateLimiter');

// POST /api/volunteer
router.post('/volunteer', formLimiter, async (req, res) => {
  try {
    const { fullName, phoneNumber, address, helpType, language } = req.body;

    // Manual Validation for required fields (Mongoose also validates, but good to catch early)
    if (!fullName || !phoneNumber || !address || !helpType) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Capture IP address
    const ipAddress = req.ip || req.connection.remoteAddress;

    // Create new volunteer
    const volunteer = await Volunteer.create({
      fullName,
      phoneNumber,
      address,
      helpType,
      language: language || 'ne',
      ipAddress
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your information has been submitted successfully.',
      data: {
        id: volunteer._id,
        fullName: volunteer.fullName
      }
    });

  } catch (error) {
    console.error('Submission Error:', error);

    // Mongoose Validation Error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error. Please try again later.'
    });
  }
});

module.exports = router;
