const { body, query, param, validationResult } = require('express-validator');

class ValidationService {
  // Auth validation rules
  getRegisterValidation() {
    return [
      body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
      body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
      body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long')
    ];
  }

  getLoginValidation() {
    return [
      body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),
      body('password')
        .notEmpty()
        .withMessage('Password is required')
    ];
  }

  getUpdateProfileValidation() {
    return [
      body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters'),
      body('email')
        .optional()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email')
    ];
  }

  getChangePasswordValidation() {
    return [
      body('currentPassword')
        .notEmpty()
        .withMessage('Current password is required'),
      body('newPassword')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long')
    ];
  }

  // Task validation rules
  getCreateTaskValidation() {
    return [
      body('title')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Title must be between 1 and 100 characters'),
      body('description')
        .trim()
        .isLength({ min: 1, max: 500 })
        .withMessage('Description must be between 1 and 500 characters'),
      body('status')
        .optional()
        .isIn(['pending', 'done'])
        .withMessage('Status must be pending or done')
    ];
  }

  getUpdateTaskValidation() {
    return [
      body('title')
        .optional()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Title must be between 1 and 100 characters'),
      body('description')
        .optional()
        .trim()
        .isLength({ min: 1, max: 500 })
        .withMessage('Description must be between 1 and 500 characters'),
      body('status')
        .optional()
        .isIn(['pending', 'done'])
        .withMessage('Status must be pending or done')
    ];
  }

  getTaskQueryValidation() {
    return [
      query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
      query('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
      query('status')
        .optional()
        .isIn(['pending', 'done', 'all'])
        .withMessage('Status must be pending, done, or all'),
      query('search')
        .optional()
        .isLength({ max: 100 })
        .withMessage('Search term too long')
    ];
  }

  getBulkUpdateValidation() {
    return [
      body('taskIds')
        .isArray({ min: 1 })
        .withMessage('Task IDs array is required'),
      body('taskIds.*')
        .isMongoId()
        .withMessage('Invalid task ID format'),
      body('status')
        .isIn(['pending', 'done'])
        .withMessage('Status must be pending or done')
    ];
  }

  // Common validation rules
  getMongoIdValidation(field = 'id') {
    return [
      param(field)
        .isMongoId()
        .withMessage(`Invalid ${field} format`)
    ];
  }

  // Validation error handler middleware
  handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }
    next();
  }
}

module.exports = new ValidationService();
