/**
 * @desc    Custom Error class for API errors
 * @param   {number} statusCode - HTTP status code
 * @param   {string} message - Error message
 * @param   {Array} errors - Array of validation errors (optional)
 */
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * @desc    Custom Response class for API responses
 * @param   {number} statusCode - HTTP status code
 * @param   {object} data - Response data (payload)
 * @param   {string} message - Response message
 */
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400; // Success is true if statusCode is in the 2xx or 3xx range
  }
}

/**
 * @desc    A higher-order function to wrap async route handlers
 * and catch any errors, passing them to the next() middleware.
 * @param   {Function} requestHandler - The async controller function
 * @returns {Function} - A new function that handles the request
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

module.exports = {
  ApiError,
  ApiResponse,
  asyncHandler,
};