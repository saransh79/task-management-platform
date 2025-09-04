const User = require('../models/User');

class UserService {
  // Get user by ID
  async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }

  // Get user by email
  async getUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  // Update user profile
  async updateUserProfile(userId, updateData) {
    const { name, email } = updateData;
    const updateFields = {};

    if (name !== undefined) updateFields.name = name;
    if (email !== undefined) {
      // Check if email is already taken by another user
      const existingUser = await User.findOne({ 
        email, 
        _id: { $ne: userId } 
      });
      if (existingUser) {
        throw new Error('Email is already taken by another user');
      }
      updateFields.email = email;
    }

    const user = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new Error('User not found');
    }

    return {
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    };
  }

  // Change user password
  async changePassword(userId, passwordData) {
    const { currentPassword, newPassword } = passwordData;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return {
      message: 'Password changed successfully'
    };
  }

  // Delete user account
  async deleteUserAccount(userId) {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Also delete all user's tasks
    const Task = require('../models/Task');
    await Task.deleteMany({ user: userId });

    return {
      message: 'Account deleted successfully'
    };
  }

  // Get user statistics
  async getUserStats(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const Task = require('../models/Task');
    const totalTasks = await Task.countDocuments({ user: userId });
    const pendingTasks = await Task.countDocuments({ user: userId, status: 'pending' });
    const completedTasks = await Task.countDocuments({ user: userId, status: 'done' });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        memberSince: user.createdAt
      },
      stats: {
        totalTasks,
        pendingTasks,
        completedTasks,
        completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
      }
    };
  }
}

module.exports = new UserService();
