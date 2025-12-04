const Incident = require('../incidents/incident.model');
const { getSocket } = require('../../services/socket');

/**
 * Parses the body of an incoming SMS to determine the incident type
 * and attempt to extract coordinates.
 *
 * @param {string} body - The text content of the SMS.
 * @returns {object} - An object containing the { type, location }.
 */
const parseSmsBody = (body) => {
  const lowerBody = body ? body.toLowerCase() : '';
  let type = 'Other'; // Default type

  // --- 1. Determine Incident Type ---
  if (lowerBody.includes('fire')) type = 'Fire';
  else if (lowerBody.includes('flood')) type = 'Flood';
  else if (lowerBody.includes('traffic')) type = 'Traffic';
  else if (lowerBody.includes('medical')) type = 'Medical';

  // --- 2. Attempt to Parse Location ---
  // A robust implementation would use a geocoding API.
  // We'll try to find coordinates (e.g., "fire at 40.7128, -74.0060")
  // GeoJSON is [longitude, latitude]
  const coordRegex = /(-?\d{1,3}\.\d+),\s*(-?\d{1,3}\.\d+)/;
  const match = lowerBody.match(coordRegex);

  let location;
  if (match && match[1] && match[2]) {
    // Assuming the user texted "latitude, longitude"
    const lat = parseFloat(match[1]);
    const lon = parseFloat(match[2]);
    location = {
      type: 'Point',
      coordinates: [lon, lat], // GeoJSON format: [longitude, latitude]
    };
    console.log(`[sms.service] Parsed coordinates from SMS: [${lon}, ${lat}]`);
  } else {
    // If no coordinates are found, use a default placeholder.
    // The admin dashboard would need to manually update this.
    console.warn(`[sms.service] Could not parse coordinates from SMS body. Using default [0, 0]. Body: "${body}"`);
    location = {
      type: 'Point',
      coordinates: [0, 0], // Default placeholder
    };
  }

  return { type, location };
};

/**
 * @desc    Handles the logic for an incoming SMS report from Twilio.
 * @param {object} twilioPayload - The full payload object from the Twilio webhook.
 * @returns {Promise<object>} - A promise that resolves to the newly created incident.
 */
const handleIncomingSms = async (twilioPayload) => {
  const { Body, MediaUrl0, From } = twilioPayload;

  if (!Body || !From) {
    console.error('[sms.service] Invalid Twilio payload. "Body" and "From" are required.');
    throw new Error('Invalid payload.');
  }

  // 1. Parse the SMS body for 'type' and 'location'
  const { type, location } = parseSmsBody(Body);

  try {
    // 2. Save this as a new Incident in the database
    const newIncident = await Incident.create({
      type,
      location,
      photoURL: MediaUrl0 || null, // Use the Twilio media URL as the photoURL
      status: 'Pending',
      // Note: A more complex schema might store the 'From' phone number
    });

    // 3. Emit a 'new-incident' event via Socket.io to the 'Admin' room
    const io = getSocket();
    if (io) {
      io.to('Admin').emit('new-incident', newIncident);
    } else {
      console.warn('[sms.service] Socket.io instance not available. Could not emit new-incident.');
    }

    return newIncident;

  } catch (error) {
    console.error('[sms.service] Error saving incident from SMS:', error);
    // Rethrow to be caught by the async handler if needed
    throw new Error('Could not process incoming SMS report.');
  }
};

module.exports = {
  handleIncomingSms,
};