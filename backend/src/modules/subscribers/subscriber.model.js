const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required.'],
    unique: true,
    trim: true,
    // A simple regex to validate E.164 format (e.g., +12125551234)
    // This can be adjusted based on your specific requirements
    match: [/^\+[1-9]\d{1,14}$/, 'Please provide a valid phone number in E.164 format (e.g., +12125551234).']
  },
  active: {
    type: Boolean,
    default: true,
  },
}, {
  // Automatically add 'createdAt' and 'updatedAt' fields
  timestamps: true,
});

// Create an index on phoneNumber for fast lookups
subscriberSchema.index({ phoneNumber: 1 });
// Create an index for finding active subscribers quickly
subscriberSchema.index({ active: 1 });

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;