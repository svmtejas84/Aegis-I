const mongoose = require('mongoose');

/**
 * GeoJSON Schema for the 'location' field.
 * This ensures that the 'location' field conforms to the GeoJSON Point specification.
 */
const geoJsonPointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true,
  },
});

const checkInSchema = new mongoose.Schema({
  identifier: {
    type: String,
    required: [true, 'An identifier is required for the check-in.'],
    trim: true,
    index: true, // Index this field for faster lookups if needed
  },
  location: {
    type: geoJsonPointSchema,
    required: true,
  },
}, {
  // Automatically add 'createdAt' and 'updatedAt' fields
  timestamps: true,
});

// Create a 2dsphere index on the location field to enable geospatial queries
checkInSchema.index({ location: '2dsphere' });

const CheckIn = mongoose.model('CheckIn', checkInSchema);

module.exports = CheckIn;