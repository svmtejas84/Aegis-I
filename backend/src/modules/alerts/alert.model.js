const mongoose = require('mongoose');

/**
 * GeoJSON Schema for the 'area' field.
 * This ensures that the 'area' field conforms to the GeoJSON Polygon specification,
 * which is necessary for geospatial queries (e.g., finding subscribers within this area).
 */
const geoJsonPolygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Polygon'],
    required: true,
  },
  coordinates: {
    type: [[[[Number]]]], // Array of array of array of numbers
    required: true,
  },
});

const alertSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Alert title is required'],
    trim: true,
  },
  message: {
    type: String,
    required: [true, 'Alert message is required'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['emergency', 'warning', 'info', 'advisory'],
    default: 'info',
  },
  area: {
    type: geoJsonPolygonSchema,
    required: false, // Made optional for broadcast alerts
  },
  isBroadcast: {
    type: Boolean,
    default: false, // True for broadcast alerts (sent to everyone)
  },
  isActive: {
    type: Boolean,
    default: true, // Can be set to false to deactivate old alerts
  },
}, {
  // Automatically add 'createdAt' and 'updatedAt' fields
  timestamps: true,
});

// Note: While the 'area' field is a GeoJSON Polygon, a '2dsphere' index
// on it is typically used if you plan to query *which alerts* a point
// falls into. For this project, we are more likely to query which *subscribers*
// fall into an alert's area, so the index would be on the Subscriber model.
// However, adding it here can be useful for future queries.
alertSchema.index({ area: '2dsphere' });

const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;