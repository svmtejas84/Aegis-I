const alertService = require('./alert.service');
// Assuming you have utility handlers in this location
const { asyncHandler, ApiResponse, ApiError } = require('../../utils/helper'); 

/**
 * @desc    Get all active alerts for the public map
 * @route   GET /api/alerts
 * @access  Public
 */
const getAlerts = asyncHandler(async (req, res) => {
  // The service handles the database query
  const alerts = await alertService.getAllPublicAlerts();
  
  return res.status(200).json(
    new ApiResponse(200, alerts, 'Active alerts retrieved successfully')
  );
});

/**
 * @desc    Create and broadcast a new alert
 * @route   POST /api/alerts
 * @access  Admin (JWT Protected)
 */
const createAlert = asyncHandler(async (req, res) => {
  const { title, message, area } = req.body;

  // --- Basic Validation ---
  if (!title || !message) {
    throw new ApiError(400, 'Title and message are required.');
  }

  if (!area || !area.type || area.type !== 'Polygon' || !area.coordinates) {
    throw new ApiError(400, 'A valid GeoJSON Polygon object is required for the "area" field.');
  }
  // --- End Validation ---

  // The alertService will handle:
  // 1. Saving the alert to the database
  // 2. Emitting the 'new-alert' event via Socket.io
  // 3. Triggering the Twilio SMS blast via the SmsService
  const newAlert = await alertService.createAndBroadcastAlert({ title, message, area });

  return res.status(201).json(
    new ApiResponse(201, newAlert, 'Alert created and broadcasted successfully')
  );
});

/**
 * @desc    Create a broadcast alert (sent to everyone)
 * @route   POST /api/alerts/broadcast
 * @access  Admin (JWT Protected)
 */
const createBroadcastAlert = asyncHandler(async (req, res) => {
  const { message, type } = req.body;

  // --- Basic Validation ---
  if (!message) {
    throw new ApiError(400, 'Message is required.');
  }

  if (!type || !['emergency', 'warning', 'info', 'advisory'].includes(type)) {
    throw new ApiError(400, 'Invalid alert type. Must be: emergency, warning, info, or advisory');
  }
  // --- End Validation ---

  // Create broadcast alert
  const newAlert = await alertService.createBroadcastAlert({ message, type });

  return res.status(201).json(
    new ApiResponse(201, newAlert, 'Broadcast alert created successfully')
  );
});

/**
 * @desc    Get latest active broadcast alerts
 * @route   GET /api/alerts/broadcast
 * @access  Public
 */
const getBroadcastAlerts = asyncHandler(async (req, res) => {
  const alerts = await alertService.getActiveBroadcastAlerts();
  
  return res.status(200).json(
    new ApiResponse(200, alerts, 'Broadcast alerts retrieved successfully')
  );
});

module.exports = {
  getAlerts,
  createAlert,
  createBroadcastAlert,
  getBroadcastAlerts,
};