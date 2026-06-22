/**
 * AppError - Custom Error Class
 * 
 * Standard error class cho toàn bộ application.
 * Giúp đồng bộ error response format trong controllers.
 * 
 * Usage:
 *   throw new AppError('Message', 400);
 *   throw new AppError('Not found', 404, 'COURSE_NOT_FOUND');
 */

class AppError extends Error {
  constructor(message, statusCode = 500, code = null) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;