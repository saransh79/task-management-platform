const Task = require('../models/Task');

class TaskService {
  async getTasks(userId, queryParams) {
    const { page = 1, limit = 10, status = 'all', search = '' } = queryParams;
    
    // Build query
    const query = { user: userId };

    // Add status filter
    if (status !== 'all') {
      query.status = status;
    }

    // Add search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const limitNum = Math.min(parseInt(limit), 100); // Max 100 per page

    // Get tasks with pagination
    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    // Get total count for pagination
    const totalTasks = await Task.countDocuments(query);
    const totalPages = Math.ceil(totalTasks / limitNum);

    return {
      tasks,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalTasks,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  }

  // Get single task by ID
  async getTaskById(taskId, userId) {
    const task = await Task.findOne({ 
      _id: taskId, 
      user: userId 
    });

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  }

  // Create new task
  async createTask(taskData, userId) {
    const { title, description, status = 'pending' } = taskData;

    const task = new Task({
      title,
      description,
      status,
      user: userId
    });

    await task.save();

    return {
      message: 'Task created successfully',
      task
    };
  }

  // Update existing task
  async updateTask(taskId, updateData, userId) {
    const { title, description, status } = updateData;
    const updateFields = {};

    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (status !== undefined) updateFields.status = status;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      updateFields,
      { new: true, runValidators: true }
    );

    if (!task) {
      throw new Error('Task not found');
    }

    return {
      message: 'Task updated successfully',
      task
    };
  }

  // Delete task
  async deleteTask(taskId, userId) {
    const task = await Task.findOneAndDelete({ 
      _id: taskId, 
      user: userId 
    });

    if (!task) {
      throw new Error('Task not found');
    }

    return {
      message: 'Task deleted successfully'
    };
  }

  // Toggle task status
  async toggleTaskStatus(taskId, userId) {
    const task = await Task.findOne({ 
      _id: taskId, 
      user: userId 
    });

    if (!task) {
      throw new Error('Task not found');
    }

    task.status = task.status === 'pending' ? 'done' : 'pending';
    await task.save();

    return {
      message: 'Task status updated successfully',
      task
    };
  }

  // Get task statistics for user
  async getTaskStats(userId) {
    const totalTasks = await Task.countDocuments({ user: userId });
    const pendingTasks = await Task.countDocuments({ user: userId, status: 'pending' });
    const completedTasks = await Task.countDocuments({ user: userId, status: 'done' });

    return {
      totalTasks,
      pendingTasks,
      completedTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    };
  }

  // Bulk update task status
  async bulkUpdateStatus(taskIds, status, userId) {
    const result = await Task.updateMany(
      { 
        _id: { $in: taskIds }, 
        user: userId 
      },
      { status }
    );

    return {
      message: `${result.modifiedCount} tasks updated successfully`,
      modifiedCount: result.modifiedCount
    };
  }

  // Delete completed tasks
  async deleteCompletedTasks(userId) {
    const result = await Task.deleteMany({
      user: userId,
      status: 'done'
    });

    return {
      message: `${result.deletedCount} completed tasks deleted`,
      deletedCount: result.deletedCount
    };
  }
}

module.exports = new TaskService();
