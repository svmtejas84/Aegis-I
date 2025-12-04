const Admin = require('../admin/admin.model');
const jwt = require('jsonwebtoken');
const config = require('../../config'); // Loads and exports .env variables
const { ApiError } = require('../../utils/helper'); // Assuming ApiError is in this path

/**
 * Generates a JSON Web Token (JWT) for an admin.
 * @param {string} adminId - The MongoDB ObjectId of the admin.
 * @returns {string} - The generated JWT.
 */
const generateToken = (adminId) => {
  return jwt.sign(
    { id: adminId, role: 'admin' }, // Payload
    config.jwtSecret, // Your secret key from .env
    { expiresIn: '1d' } // Token expiration
  );
};

/**
 * @desc    Validates admin credentials and returns a JWT.
 * @param {string} username - The admin's username.
 * @param {string} password - The admin's plain-text password.
 * @returns {Promise<object>} - A promise that resolves to an object { token, adminData }.
 */
const loginAdminWithUsernameAndPassword = async (username, password) => {
  // 1. Find the admin by username
  // .select('+password') is crucial because the password field is likely
  // not selected by default in a real app (though it isn't explicitly hidden in the model)
  const admin = await Admin.findOne({ username: username.toLowerCase() }).select('+password');

  if (!admin) {
    throw new ApiError(401, 'Invalid username or password.');
  }

  // 2. Compare the candidate password with the stored hash
  const isMatch = await admin.isPasswordCorrect(password);

  if (!isMatch) {
    throw new ApiError(401, 'Invalid username or password.');
  }

  // 3. Generate the JWT
  const token = generateToken(admin._id);

  // 4. Prepare user data to return (exclude password)
  const adminData = {
    _id: admin._id,
    username: admin.username,
  };

  return { token, adminData };
};

module.exports = {
  loginAdminWithUsernameAndPassword,
};