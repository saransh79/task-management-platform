const express = require('express');
const { validationResult } = require('express-validator');
const taskService = require('../services/taskService');
const validationService = require('../services/validationService');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(auth);

// Get all tasks with search, filter, and pagination
router.get('/', 
  validationService.getTaskQueryValidation(),
  validationService.handleValidationErrors,
  async (req, res) => {
  try {
    const result = await taskService.getTasks(req.user._id, req.query);
    res.json(result);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
});

// Get single task
router.get('/:id', async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user._id);
    res.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    
    if (error.message === 'Task not found') {
      return res.status(404).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Server error while fetching task' });
  }
});

// Create new task
router.post('/', 
  validationService.getCreateTaskValidation(),
  validationService.handleValidationErrors,
  async (req, res) => {
  try {
    const result = await taskService.createTask(req.body, req.user._id);
    res.status(201).json(result);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error while creating task' });
  }
});

// Update task
router.put('/:id', 
  validationService.getUpdateTaskValidation(),
  validationService.handleValidationErrors,
  async (req, res) => {
  try {
    const result = await taskService.updateTask(req.params.id, req.body, req.user._id);
    res.json(result);
  } catch (error) {
    console.error('Update task error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    
    if (error.message === 'Task not found') {
      return res.status(404).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Server error while updating task' });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const result = await taskService.deleteTask(req.params.id, req.user._id);
    res.json(result);
  } catch (error) {
    console.error('Delete task error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    
    if (error.message === 'Task not found') {
      return res.status(404).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Server error while deleting task' });
  }
});

// Toggle task status
router.patch('/:id/toggle', async (req, res) => {
  try {
    const result = await taskService.toggleTaskStatus(req.params.id, req.user._id);
    res.json(result);
  } catch (error) {
    console.error('Toggle task error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    
    if (error.message === 'Task not found') {
      return res.status(404).json({ message: error.message });
    }
    
    res.status(500).json({ message: 'Server error while toggling task status' });
  }
});

// Get task statistics
router.get('/stats', async (req, res) => {
  try {
    const result = await taskService.getTaskStats(req.user._id);
    res.json(result);
  } catch (error) {
    console.error('Get task stats error:', error);
    res.status(500).json({ message: 'Server error while fetching task statistics' });
  }
});

// Bulk update task status
router.patch('/bulk-status', 
  validationService.getBulkUpdateValidation(),
  validationService.handleValidationErrors,
  async (req, res) => {
  try {
    const { taskIds, status } = req.body;
    const result = await taskService.bulkUpdateStatus(taskIds, status, req.user._id);
    res.json(result);
  } catch (error) {
    console.error('Bulk update error:', error);
    res.status(500).json({ message: 'Server error during bulk update' });
  }
});

// Delete completed tasks
router.delete('/completed', async (req, res) => {
  try {
    const result = await taskService.deleteCompletedTasks(req.user._id);
    res.json(result);
  } catch (error) {
    console.error('Delete completed tasks error:', error);
    res.status(500).json({ message: 'Server error while deleting completed tasks' });
  }
});

module.exports = router;