const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true }, // e.g. VERIFY_STARTUP, BLOCK_USER, VERIFY_DEAL
    targetResource: { type: String, required: true }, // e.g. Startup, User, FundingRecord
    resourceId: { type: String, default: '' },
    details: { type: String, required: true },
    ipAddress: { type: String, default: '127.0.0.1' },
  },
  { timestamps: true, collection: 'activityLogs' }
);

module.exports = mongoose.model('AuditLog', auditLogSchema);
