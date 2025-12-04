const smsService = require('./sms.service');
const { asyncHandler } = require('../../utils/helper');
const twilio = require('twilio');

/**
 * @desc    Handles inbound SMS reports from Twilio webhook
 * @route   POST /api/sms/report
 * @access  Public (Webhook)
 */
const handleSmsWebhook = asyncHandler(async (req, res) => {
  const twilioPayload = req.body;

  // Asynchronously process the incoming SMS report.
  // The service will parse the payload, create the incident,
  // and emit the 'new-incident' socket event.
  // We don't 'await' this, so we can respond to Twilio immediately.
  smsService.handleIncomingSms(twilioPayload)
    .catch(err => {
      // Log any errors that happen during the background processing
      console.error('Error processing incoming SMS webhook:', err);
    });

  // Respond to Twilio immediately with TwiML to acknowledge receipt.
  // This is required by Twilio to stop it from retrying the webhook.
  const twiml = new twilio.twiml.MessagingResponse();
  
  // You could optionally send an auto-reply back to the user:
  // twiml.message('Your emergency report has been received and is being processed.');

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

module.exports = {
  handleSmsWebhook,
};