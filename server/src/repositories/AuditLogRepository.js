const AuditLog = require('../models/AuditLog');

class AuditLogRepository {
  async log(adminId, action, targetResource, resourceId, details, ipAddress = '127.0.0.1') {
    return AuditLog.create({
      admin: adminId,
      action,
      targetResource,
      resourceId,
      details,
      ipAddress,
    });
  }

  async findAll(limit = 50) {
    return AuditLog.find().populate('admin', 'name email role').sort({ createdAt: -1 }).limit(limit);
  }
}

module.exports = new AuditLogRepository();
