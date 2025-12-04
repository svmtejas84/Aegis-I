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

const incidentSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: {
      values: ['cyclone', 'flood', 'heatwave', 'landslide', 'earthquake', 'tsunami', 'other'], // Match frontend disaster types
      message: '{VALUE} is not a supported incident type.',
    },
    required: [true, 'Incident type is required.'],
    trim: true,
  },
  location: {
    type: geoJsonPointSchema,
    required: [true, 'A GeoJSON location is required.'],
  },
  status: {
    type: String,
    enum: ['Pending', 'Acknowledged', 'Resolved'],
    default: 'Pending',
  },
  photo: {
    data: {
      type: String, // Base64 encoded image data
      default: null,
    },
    contentType: {
      type: String, // e.g., 'image/jpeg', 'image/png'
      default: null,
    },
    filename: {
      type: String,
      default: null,
    },
  },
  additionalNotes: {
    type: String,
    trim: true,
    default: '',
  },
}, {
  // Automatically add 'createdAt' and 'updatedAt' fields
  timestamps: true,
});

// Create a 2dsphere index on the location field for efficient geospatial queries
incidentSchema.index({ location: '2dsphere' });

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;