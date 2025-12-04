const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');
const config = require('../config'); // Loads .env variables

// --- Configuration ---
// The 'config' object (from ../config/index.js) reads the
// .env variables and provides them to the cloudinary client.
cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

/**
 * @desc    Uploads a local file to Cloudinary
 * @param {string} localFilePath - The path to the file on the local server (e.g., from req.file.path)
 * @returns {Promise<object>} - A promise that resolves to the Cloudinary upload result object
 */
const uploadImage = async (localFilePath) => {
  try {
    if (!localFilePath) {
      throw new Error('Local file path is required for upload.');
    }

    // Upload the file to Cloudinary
    // We can specify a folder name, e.g., 'emergency_response_app'
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      folder: 'emergency_response_app',
      resource_type: 'auto', // Automatically detect file type (image, video, etc.)
    });

    // It's good practice to delete the local file after a successful upload
    // Note: The controller that calls this function *also* does this.
    // Having it here is a good fallback, but be careful of race conditions.
    // The controller is a better place for the unlinkSync.
    // fs.unlinkSync(localFilePath); 

    return uploadResult;

  } catch (error) {
    // If upload fails, make sure to delete the local temp file
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath); // Clean up the temp file
    }
    console.error('Cloudinary Upload Error:', error);
    throw new Error('Failed to upload file to Cloudinary.');
  }
};

module.exports = {
  uploadImage,
};