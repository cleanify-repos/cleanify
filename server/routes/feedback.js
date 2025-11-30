const express = require('express');
const router = express.Router();

// POST /api/send-feedback - Receive feedback (email sending disabled for now)
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

    console.log(`✅ Feedback received from ${name} - Category: ${category}`);

    // For now, just return success without sending emails
    // This confirms the backend is working
    res.json({
      ok: true,
      message: '✅ Thank you! Your feedback has been received. We will review it soon.',
      feedbackId: `FB-${Date.now()}`
    });

  } catch (err) {
    console.error('❌ Feedback error:', err.message);
    res.status(500).json({
      error: 'Failed to process feedback: ' + err.message
    });
  }
});

module.exports = router;
