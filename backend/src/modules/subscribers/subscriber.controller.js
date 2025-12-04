const Subscriber = require('./subscriber.model');
// Assuming you have utility handlers in this location
const { asyncHandler, ApiResponse, ApiError } = require('../../utils/helper');

/**
 * @desc    Opt-in a user for SMS alerts
 * @route   POST /api/subscribers/subscribe
 * @access  Public
 */
const subscribeUser = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    throw new ApiError(400, 'Phone number is required.');
  }

  // Use findOneAndUpdate with 'upsert: true'
  // This will either create a new subscriber with active: true
  // or update an existing one to set active: true.
  const subscriber = await Subscriber.findOneAndUpdate(
    { phoneNumber: phoneNumber },
    { $set: { active: true } },
    { upsert: true, new: true, runValidators: true }
  );

  return res.status(200).json(
    new ApiResponse(200, subscriber, 'Successfully subscribed to alerts.')
  );
});

/**
 * @desc    Opt-out a user from SMS alerts
 * @route   POST /api/subscribers/unsubscribe
 * @access  Public
 */
const unsubscribeUser = asyncHandler(async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    throw new ApiError(400, 'Phone number is required.');
  }

  // Find the subscriber and set their 'active' status to false
  const subscriber = await Subscriber.findOneAndUpdate(
    { phoneNumber: phoneNumber },
    { $set: { active: false } },
    { new: true } // Return the modified document
  );

  if (!subscriber) {
    throw new ApiError(44, 'Subscriber not found with this phone number.');
  }

  return res.status(200).json(
    new ApiResponse(200, subscriber, 'Successfully unsubscribed from alerts.')
  );
});

module.exports = {
  subscribeUser,
  unsubscribeUser,
};