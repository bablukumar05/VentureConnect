const Notification = require('../models/Notification');

const getUserNotifications = async (userId) => {
  return await Notification.find({ recipient: userId })
    .populate('sender', 'name avatar')
    .sort({ createdAt: -1 })
    .limit(30);
};

const markAsRead = async (notificationId) => {
  return await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
};

const markAllAsRead = async (userId) => {
  return await Notification.updateMany({ recipient: userId, isRead: false }, { isRead: true });
};

module.exports = {
  getUserNotifications,
  markAsRead,
  markAllAsRead,
};
