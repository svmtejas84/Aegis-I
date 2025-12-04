const twilio = require('twilio');
const config = require('../config'); // Loads .env variables
const Subscriber = require('../modules/subscribers/subscriber.model');

// --- Twilio Client Initialization ---
let client;
try {
  // Check if all required Twilio config variables are present
  if (!config.twilioAccountSid || !config.twilioAuthToken || !config.twilioPhoneNumber) {
    throw new Error('Missing Twilio credentials in .env file (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER).');
  }
  
  client = twilio(config.twilioAccountSid, config.twilioAuthToken);
  console.log('[Twilio] Client initialized successfully.');

} catch (error) {
  console.error(`[Twilio] Failed to initialize client. ${error.message}`);
  client = null;
}

/**
 * @desc    Sends a broadcast SMS alert message to all active subscribers.
 * @param {string} message - The text message to send.
 */
const sendAlertSms = async (message) => {
  if (!client) {
    console.error('[Twilio] Cannot send SMS. Client is not initialized.');
    return; // Stop execution if the client failed to init
  }

  try {
    // 1. Fetch all active subscribers from the database
    const subscribers = await Subscriber.find({ active: true });

    if (subscribers.length === 0) {
      console.log('[Twilio] No active subscribers to send alerts to.');
      return;
    }

    console.log(`[Twilio] Preparing to send SMS to ${subscribers.length} subscribers...`);

    // 2. Create an array of promises, one for each message
    const messagePromises = subscribers.map(subscriber => {
      return client.messages.create({
        body: `[Emergency Alert] ${message}`, // Prepend a context header
        from: config.twilioPhoneNumber,
        to: subscriber.phoneNumber,
      });
    });

    // 3. Wait for all messages to be processed
    const results = await Promise.allSettled(messagePromises);

    let successCount = 0;
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        successCount++;
        // Log for success (optional, can be noisy)
        // console.log(`[Twilio] Successfully sent SMS to ${subscribers[index].phoneNumber} (SID: ${result.value.sid})`);
      } else {
        // Log errors for failed messages
        console.error(`[Twilio] Failed to send SMS to ${subscribers[index].phoneNumber}. Reason: ${result.reason.message}`);
      }
    });

    console.log(`[Twilio] Broadcast complete. Successfully sent ${successCount}/${subscribers.length} messages.`);

  } catch (error) {
    console.error('[Twilio] An error occurred during the SMS broadcast:', error);
  }
};

module.exports = {
  sendAlertSms,
};