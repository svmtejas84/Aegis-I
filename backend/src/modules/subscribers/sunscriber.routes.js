const express = require('express');
const {
  subscribeUser,
  unsubscribeUser,
} = require('./subscriber.controller');

const router = express.Router();

// POST /api/subscribers/subscribe
// Opts-in a user for SMS alerts
router.post('/subscribe', subscribeUser);

// POST /api/subscribers/unsubscribe
// Opts-out a user from SMS alerts
router.post('/unsubscribe', unsubscribeUser);

module.exports = router;