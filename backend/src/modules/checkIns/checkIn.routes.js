const express = require('express');
const { createCheckIn } = require('./checkIn.controller');

const router = express.Router();

// POST /api/check-ins
// Logs an "I Am Safe" check-in
router.post('/', createCheckIn);

module.exports = router;