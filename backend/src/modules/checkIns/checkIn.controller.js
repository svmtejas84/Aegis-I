const CheckIn = require('./checkIn.model');
// Assuming you have utility handlers in this location
const { asyncHandler, ApiResponse, ApiError } = require('../../utils/helper');

/**
 * @desc    Logs an "I Am Safe" check-in
 * @route   POST /api/check-ins
 * @access  Public
 */
const createCheckIn = asyncHandler(async (req, res) => {
  const { identifier, location } = req.body;

  // --- Basic Validation ---
  if (!identifier) {
    throw new ApiError(400, 'An identifier (e.g., device ID or phone number) is required.');
  }
  if (!location || !location.type || location.type !== 'Point' || !location.coordinates) {
    throw new ApiError(400, 'A valid GeoJSON Point object is required for the "location" field.');
  }
  // --- End Validation ---

  // Create and save the new check-in
  const newCheckIn = await CheckIn.create({
    identifier,
    location,
  });

  return res.status(201).json(
    new ApiResponse(201, newCheckIn, '"I Am Safe" check-in recorded successfully.')
  );
});

module.exports = {
  createCheckIn,
};