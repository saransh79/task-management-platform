const express = require('express');
const { validationResult } = require('express-validator');
const authService = require('../services/authService');
const userService = require('../services/userService');
const validationService = require('../services/validationService');
const auth = require('../middleware/auth');

const router = express.Router();

// Register route
router.post('/register', 
  validationService.getRegisterValidation(),
  validationService.handleValidationErrors,
  async (req, res) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.message === 'User already exists with this email') {
      return res.status(400).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login route
router.post('/login', 
  validationService.getLoginValidation(),
  validationService.handleValidationErrors,
  async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    res.json(result);
  } catch (error) {
    console.error('Login error:', error);
    
    if (error.message === 'Invalid credentials') {
      return res.status(400).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const result = await userService.getUserById(req.user._id);
    res.json({ user: result });
  } catch (error) {
    console.error('Get user error:', error);
    
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, 
  validationService.getUpdateProfileValidation(),
  validationService.handleValidationErrors,
  async (req, res) => {
  try {
    const result = await userService.updateUserProfile(req.user._id, req.body);
    res.json(result);
  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error.message === 'Email is already taken by another user' || 
        error.message === 'User not found') {
      return res.status(400).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Server error during profile update' });
  }
});

// Change password
router.put('/password', auth, 
  validationService.getChangePasswordValidation(),
  validationService.handleValidationErrors,
  async (req, res) => {
  try {
    const result = await userService.changePassword(req.user._id, req.body);
    res.json(result);
  } catch (error) {
    console.error('Change password error:', error);
    
    if (error.message === 'Current password is incorrect' || 
        error.message === 'User not found') {
      return res.status(400).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Server error during password change' });
  }
});

// Get user stats
router.get('/stats', auth, async (req, res) => {
  try {
    const result = await userService.getUserStats(req.user._id);
    res.json(result);
  } catch (error) {
    console.error('Get user stats error:', error);
    
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;