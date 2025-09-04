class ErrorService {
  handleError(error, req, res, next) {
    console.error('Error occurred:', error);

    // Mongoose validation error
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      return res.status(400).json({
        message: 'Validation failed',
        errors
      });
    }

    // Mongoose cast error (invalid ObjectId)
    if (error.name === 'CastError') {
      return res.status(400).json({
        message: 'Invalid ID format'
      });
    }

    // Duplicate key error (MongoDB)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        message: `${field} already exists`
      });
    }

    // JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: 'Invalid token'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token expired'
      });
    }

    // Custom application errors
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        message: error.message
      });
    }

    // Default server error
    res.status(500).json({
      message: 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
  }

  // Create custom error
  createError(message, statusCode = 500) {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  }

  // Not found error
  notFoundError(resource = 'Resource') {
    return this.createError(`${resource} not found`, 404);
  }

  // Unauthorized error
  unauthorizedError(message = 'Unauthorized') {
    return this.createError(message, 401);
  }

  // Forbidden error
  forbiddenError(message = 'Forbidden') {
    return this.createError(message, 403);
  }

  // Bad request error
  badRequestError(message = 'Bad request') {
    return this.createError(message, 400);
  }

  // Conflict error
  conflictError(message = 'Conflict') {
    return this.createError(message, 409);
  }

  // Async error wrapper
  asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

module.exports = new ErrorService();
