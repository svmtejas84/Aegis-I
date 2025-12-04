const jwt = require('jsonwebtoken');
const config = require('../config');
const Admin = require('../modules/admin/admin.model');
const { ApiError, asyncHandler } = require('../utils/helper');

/**
 * Protect routes - Verify JWT token
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Check if token exists
  if (!token) {
    throw new ApiError(401, 'Not authorized. Please log in.');
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.jwtSecret);

    // Get admin from token
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      throw new ApiError(401, 'Admin not found. Token invalid.');
    }

    // Attach admin to request
    req.admin = admin;
    next();
  } catch (error) {
    throw new ApiError(401, 'Not authorized. Invalid token.');
  }
});

module.exports = { protect };
