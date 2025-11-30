const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Gmail configuration
const gmailUser = process.env.GMAIL_USER || 'cleanifyfeedback@gmail.com';
const gmailPassword = process.env.GMAIL_PASSWORD || '';
const feedbackRecipient = process.env.FEEDBACK_RECIPIENT || 'cleanifyfeedback@gmail.com';

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailUser,
    pass: gmailPassword
  }
});

console.log('📧 Gmail transporter configured for:', gmailUser);

// Test endpoint to verify transporter configuration
router.get('/test', async (req, res) => {
  console.log('🧪 Testing Gmail transporter...');
  console.log('Gmail User:', gmailUser);
  console.log('Gmail Password length:', gmailPassword?.length || 0);
  console.log('Feedback Recipient:', feedbackRecipient);
  
  try {
    // Test the connection
    const verified = await transporter.verify();
    console.log('✅ Transporter verified:', verified);
    res.json({ 
      ok: verified,
      message: verified ? 'Gmail transporter is ready!' : 'Transporter not ready'
    });
  } catch (err) {
    console.error('❌ Transporter test error:', err.message);
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
});

// POST /api/send-feedback - Send feedback via Gmail
router.post('/', async (req, res) => {
  try {
    const { name, email, category, feedback, timestamp } = req.body;

    console.log('📨 Feedback request received:', { name, email, category });

    // Validate inputs
    if (!name || !feedback || !email) {
      return res.status(400).json({ error: 'Missing name, email, or feedback' });
    }

    // Validate email format
    if (email.indexOf('@') === -1) {
      return res.status(400).json({ error: 'Valid email address required' });
    }

    const feedbackDate = new Date(timestamp || Date.now()).toLocaleString();

    // Email to admin
    const adminEmail = {
      from: gmailUser,
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
      from: gmailUser,
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

    console.log('📧 Attempting to send admin email...');
    await transporter.sendMail(adminEmail);
    console.log(`✅ Admin email sent from ${email} - Category: ${category}`);

    console.log('📧 Attempting to send confirmation email...');
    await transporter.sendMail(userEmail);
    console.log(`✅ Confirmation email sent to ${email}`);

    res.json({
      ok: true,
      message: '✅ Thank you! Your feedback has been sent and a confirmation email has been sent to your inbox.',
      feedbackId: `FB-${Date.now()}`
    });

  } catch (err) {
    console.error('❌ Feedback error:', err.message);
    console.error('Error stack:', err.stack);
    res.status(500).json({
      error: 'Failed to send feedback: ' + err.message
    });
  }
});

module.exports = router;
