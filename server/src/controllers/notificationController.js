const notificationService = require('../services/notificationService');

const getNotifications = async (req, res) => {
  try {
    const notifications = await notificationService.getUserNotifications(req.user._id);
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const markRead = async (req, res) => {
  try {
    const notification = await notificationService.markAsRead(req.params.id);
    res.status(200).json({ success: true, notification });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const markAllRead = async (req, res) => {
  try {
    await notificationService.markAllAsRead(req.user._id);
    res.status(200).json({ success: true, message: 'All marked as read' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { getNotifications, markRead, markAllRead };
