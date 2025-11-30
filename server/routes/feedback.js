const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

// SendGrid configuration
const sendGridApiKey = process.env.SENDGRID_API_KEY || '';
const feedbackFrom = process.env.FEEDBACK_FROM || 'cleanifyfeedback@gmail.com';
const feedbackRecipient = process.env.FEEDBACK_RECIPIENT || 'cleanifyfeedback@gmail.com';

sgMail.setApiKey(sendGridApiKey);

console.log('📧 SendGrid configured with API key');

// POST /api/send-feedback - Send feedback via Gmail
router.post('/', async (req, res) => {
  try {
    const { name, email, category, feedback, timestamp } = req.body;

    // Validate inputs
    if (!name || !feedback || !email) {
      return res.status(400).json({ error: 'Missing name, email, or feedback' });
    }

    // Validate email format
    if (email.indexOf('@') === -1) {
      return res.status(400).json({ error: 'Valid email address required' });
    }

    const feedbackDate = new Date(timestamp).toLocaleString();

    // Email to admin
    const adminEmail = {
      from: feedbackFrom,
      to: feedbackRecipient,
      subject: `[${category}] New Feedback from ${name}`,
      html: `
        <h2>New Feedback Received</h2>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Received:</strong> ${feedbackDate}</p>
        <hr />
        <h3>Feedback Message:</h3>
        <p>${feedback.replace(/\n/g, '<br>')}</p>
        <hr />
        <p><em>This is an automated message from Cleanify Citizen App</em></p>
      `,
      replyTo: email
    };

    // Email to user (confirmation)
    const userEmail = {
      from: feedbackFrom,
      to: email,
      subject: 'We Received Your Feedback - Cleanify Citizen',
      html: `
        <h2>Thank You for Your Feedback! ❤️</h2>
        <p>Dear ${name},</p>
        <p>We have received your feedback and greatly appreciate your input. Your message helps us improve the Cleanify Citizen App.</p>
        <hr />
        <p><strong>Your Feedback Summary:</strong></p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Submitted:</strong> ${feedbackDate}</p>
        <hr />
        <p>We will review your feedback and respond if needed. Thank you for using our app!</p>
        <p style="font-style: italic; color: #26a69a; margin-top: 20px;">Best regards,<br/>Cleanify Team</p>
      `
    };

    // Send emails via SendGrid
    await sgMail.send(adminEmail);
    console.log(`📧 Admin email sent from ${email} - Category: ${category}`);

    await sgMail.send(userEmail);
    console.log(`📧 Confirmation email sent to ${email}`);

    res.json({
      ok: true,
      message: '✅ Thank you! Your feedback has been sent and a confirmation email has been sent to your inbox.',
      feedbackId: `FB-${Date.now()}`
    });

  } catch (err) {
    console.error('❌ Feedback error:', err.message);
    res.status(500).json({
      error: 'Failed to send feedback: ' + err.message
    });
  }
});

module.exports = router;
