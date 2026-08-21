const Notification = require('../models/Notification');

class ActivityRepository {
  async logUserActivity(userId, type, title, message, link = '/') {
    return Notification.create({
      recipient: userId,
      type,
      title,
      message,
      link,
      isRead: false,
    });
  }

  async getRecentActivities(userId, limit = 10) {
    return Notification.find({ recipient: userId }).sort({ createdAt: -1 }).limit(limit);
  }
}

module.exports = new ActivityRepository();
