const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
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

// Gmail configuration
const gmailUser = process.env.GMAIL_FROM || 'cleanifyfeedback@gmail.com';
const gmailPassword = process.env.GMAIL_PASSWORD || '';

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailUser,
    pass: gmailPassword
  }
});

console.log('📧 Email service initialized for:', gmailUser);

// POST /api/send-feedback - Save feedback to database AND send email
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
    console.log(`📝 Feedback saved to database from ${userEmail}`);

    // Send email asynchronously (don't wait for it)
    sendEmailAsync(name, userEmail, category, feedback, timestamp).catch(err => {
      console.error('Email send failed:', err.message);
    });

    res.json({
      ok: true,
      message: '✅ Thank you! Your feedback has been received and an email confirmation has been sent.',
      feedbackId: feedbackDoc._id
    });

  } catch (err) {
    console.error('Error saving feedback:', err);
    res.status(500).json({
      error: 'Failed to save feedback: ' + err.message
    });
  }
});

// Async function to send emails (doesn't block the response)
async function sendEmailAsync(name, userEmail, category, feedback, timestamp) {
  try {
    // Email to admin
    const adminEmailContent = `
      <h2>New Feedback Received</h2>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>From:</strong> ${name} (${userEmail})</p>
      <p><strong>Received:</strong> ${new Date(timestamp).toLocaleString()}</p>
      <hr />
      <h3>Feedback Message:</h3>
      <p>${feedback.replace(/\n/g, '<br>')}</p>
      <hr />
      <p><em>This is an automated message from Cleanify Citizen App</em></p>
    `;

    // Email to user (confirmation)
    const userEmailContent = `
      <h2>Thank You for Your Feedback! ❤️</h2>
      <p>Dear ${name},</p>
      <p>We have received your feedback and greatly appreciate your input. Your message helps us improve the Cleanify Citizen App.</p>
      <hr />
      <p><strong>Your Feedback Summary:</strong></p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}</p>
      <hr />
      <p>We will review your feedback and respond if needed. Thank you for using our app!</p>
      <p style="font-style: italic; color: #26a69a; margin-top: 20px;">Automated message from Cleanify Citizen Team</p>
      <p>Best regards,<br/>Cleanify Team</p>
    `;

    // Send to admin
    await transporter.sendMail({
      from: gmailUser,
      to: process.env.FEEDBACK_RECIPIENT || 'cleanifyfeedback@gmail.com',
      subject: `[${category}] New Feedback from ${name}`,
      html: adminEmailContent,
      replyTo: userEmail
    });

    console.log(`📧 Admin email sent - Category: ${category}`);

    // Send confirmation to user
    await transporter.sendMail({
      from: gmailUser,
      to: userEmail,
      subject: 'We Received Your Feedback - Cleanify Citizen',
      html: userEmailContent
    });

    console.log(`📧 Confirmation email sent to ${userEmail}`);

  } catch (err) {
    console.error('❌ Email send error:', err.message);
    throw err;
  }
}

module.exports = router;
