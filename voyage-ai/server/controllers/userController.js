const User = require('../models/User');
const Trip = require('../models/Trip');
const SavedDestination = require('../models/SavedDestination');
const AIConversation = require('../models/AIConversation');

// @desc    Get all users (admin)
// @route   GET /api/users
exports.getUsers = async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await User.countDocuments();
    const users = await User.find().skip(skip).limit(parseInt(limit)).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user (admin)
// @route   GET /api/users/:id
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user (admin)
// @route   PUT /api/users/:id
exports.updateUser = async (req, res, next) => {
  try {
    // Allow-list: admins may edit profile data, but NEVER account ownership,
    // role, password, or any other protected field through this endpoint.
    // A raw req.body spread would persist a plaintext password (bypassing the
    // bcrypt pre-save hook) or escalate a user to admin.
    const allowedFields = ['name', 'email', 'phone', 'location', 'bio', 'avatar', 'isActive', 'travelPreferences'];
    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    if (req.body.password !== undefined || req.body.role !== undefined) {
      return res.status(400).json({
        success: false,
        message: 'Passwords and roles cannot be changed through this endpoint'
      });
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user (admin)
// @route   DELETE /api/users/:id
exports.deleteUser = async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own account' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Cascade: remove the user's trips, saved destinations, and AI history so
    // no orphaned documents linger after their account is gone.
    await Promise.all([
      Trip.deleteMany({ user: user._id }),
      SavedDestination.deleteMany({ user: user._id }),
      AIConversation.deleteMany({ user: user._id })
    ]);

    await User.findByIdAndDelete(user._id);
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard stats (admin)
// @route   GET /api/users/admin/stats
exports.getAdminStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const adminCount = await User.countDocuments({ role: 'admin' });

    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeUsers,
        adminCount,
        recentUsers
      }
    });
  } catch (error) {
    next(error);
  }
};
