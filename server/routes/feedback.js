const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const emailConfig = require('../config/emailConfig');
const User = require('../models/User');

// Create transporter for sending emails
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailConfig.from,
    pass: emailConfig.gmailPassword
  }
});

// Test email configuration
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email configuration issue:', error.message);
    console.log('📧 Gmail setup instructions:');
    console.log('1. Visit https://myaccount.google.com/apppasswords');
    console.log('2. Select "Mail" and "Windows Computer" (or your device)');
    console.log('3. Copy the generated 16-character password');
    console.log('4. Set GMAIL_PASSWORD environment variable');
  } else {
    console.log('✅ Email service is ready to send');
  }
});

// POST /api/send-feedback - Send feedback via email
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

    // Allow optional feedback (just rating is ok)
    if (feedback && feedback.length < 5) {
      // Accept short feedback or just ratings
    }

    // Email to admin
    const adminEmailContent = `
      <h2>New Feedback Received</h2>
      <p><strong>Category:</strong> ${category.toUpperCase()}</p>
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
      <p><strong>Category:</strong> ${category.charAt(0).toUpperCase() + category.slice(1)}</p>
      <p><strong>Submitted:</strong> ${new Date(timestamp).toLocaleString()}</p>
      <hr />
      <p>We will review your feedback and respond if needed. Thank you for using our app!</p>
      <p style="font-style: italic; color: #26a69a; margin-top: 20px;">Automated feedback from Vivek ❤️</p>
      <p>Best regards,<br/>Cleanify Citizen Team</p>
    `;

    // Send to admin
    await transporter.sendMail({
      from: emailConfig.from,
      to: emailConfig.feedbackRecipient,
      subject: `[${category.toUpperCase()}] New Feedback from ${name}`,
      html: adminEmailContent,
      replyTo: userEmail
    });

    // Send confirmation to user
    await transporter.sendMail({
      from: emailConfig.from,
      to: userEmail,
      subject: 'We Received Your Feedback - Cleanify Citizen',
      html: userEmailContent
    });

    console.log(`📧 Feedback email sent from ${userEmail} - Category: ${category}`);

    res.json({
      ok: true,
      message: 'Feedback sent successfully',
      feedbackId: `FB-${Date.now()}`
    });

  } catch (err) {
    console.error('Feedback email error:', err);

    // Check if it's a Gmail authentication error
    if (err.message.includes('Invalid login') || err.message.includes('Bad credentials')) {
      return res.status(500).json({
        error: 'Email service not configured. Please contact admin.',
        details: 'Gmail authentication failed'
      });
    }

    res.status(500).json({
      error: 'Failed to send feedback: ' + err.message
    });
  }
});

module.exports = router;
