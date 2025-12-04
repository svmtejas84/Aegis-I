
const authService = require('./auth.service');
// Assuming you have utility handlers in this location
const { asyncHandler, ApiResponse, ApiError } = require('../../utils/helper');

/**
 * @desc    Logs in an admin
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // 1. Basic Validation
  if (!username || !password) {
    throw new ApiError(400, 'Username and password are required.');
  }

  // 2. Call the auth service to validate credentials and generate a token
  // The service will handle finding the user, comparing the password,
  // and throwing an error if credentials are valid.
  const { token, adminData } = await authService.loginAdminWithUsernameAndPassword(
    username,
    password
  );

  // 3. Send the response
  // In a real app, you might also set the token in an HttpOnly cookie
  return res.status(200).json(
    new ApiResponse(
      200,
      { user: adminData, token },
      'Admin logged in successfully'
    )
  );
});

module.exports = {
  loginAdmin,
};