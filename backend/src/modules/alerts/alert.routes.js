const express = require('express');
const { getAlerts, createAlert, createBroadcastAlert, getBroadcastAlerts } = require('./alert.controller');
const { protect } = require('../../middleware/auth'); // Admin JWT auth middleware

const router = express.Router();

// --- Public Routes ---

// GET /api/alerts
// Gets all active alerts for the public map
router.get('/', getAlerts);

// GET /api/alerts/broadcast
// Gets all active broadcast alerts
router.get('/broadcast', getBroadcastAlerts);


// --- Admin Routes (Protected) ---

// POST /api/alerts
// Creates and broadcasts a new alert
router.post('/', protect, createAlert);

// POST /api/alerts/broadcast
// Creates a broadcast alert (sent to everyone)
// TODO: Add back protect middleware for production
router.post('/broadcast', createBroadcastAlert); // Temporarily removed 'protect' for testing


module.exports = router;