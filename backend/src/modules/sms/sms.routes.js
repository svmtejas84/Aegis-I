const express = require('express');
const { handleSmsWebhook } = require('./sms.controller');

const router = express.Router();

// POST /api/sms/report
// This is the webhook endpoint for Twilio
// Twilio sends webhook data as 'application/x-www-form-urlencoded'
router.post(
  '/report',
  express.urlencoded({ extended: false }),
  handleSmsWebhook
);

module.exports = router;