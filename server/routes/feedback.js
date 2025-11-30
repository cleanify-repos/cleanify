const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

// Create Feedback schema for storing feedback in database
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  category: String,
  feedback: String,
  timestamp: Date,
  createdAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

console.log('✅ Feedback service is ready (database only, no email)');

// POST /api/send-feedback - Save feedback to database
router.post('/', async (req, res) => {
  try {
    const { name, email, category, feedback, timestamp } = req.body;

    // Validate inputs
    if (!name || !feedback) {
      return res.status(400).json({ error: 'Missing name or feedback' });
    }

    // Get user email from database if not provided or empty
    let userEmail = email;
    if (!userEmail || userEmail === 'user@example.com') {
      const user = await User.findOne({ name });
      if (user && user.email) {
        userEmail = user.email;
      } else {
        userEmail = email || 'user@example.com';
      }
    }

    // Validate email format
    if (!userEmail || userEmail.indexOf('@') === -1) {
      return res.status(400).json({ error: 'Valid email address required' });
    }

    // Save feedback to database
    const feedbackDoc = new Feedback({
      name,
      email: userEmail,
      category,
      feedback,
      timestamp: new Date(timestamp)
    });

    await feedbackDoc.save();
    console.log(`� Feedback saved from ${userEmail} - Category: ${category}`);

    res.json({
      ok: true,
      message: '✅ Thank you! Your feedback has been received.',
      feedbackId: feedbackDoc._id
    });

  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).json({
      error: 'Failed to save feedback: ' + err.message
    });
  }
});

module.exports = router;
