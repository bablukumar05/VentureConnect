const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    plan: { type: String, enum: ['free', 'pro', 'enterprise'], default: 'pro' },
    status: { type: String, enum: ['active', 'cancelled', 'expired'], default: 'active' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    autoRenew: { type: Boolean, default: true },
    features: [{ type: String }],
  },
  { timestamps: true, collection: 'subscriptions' }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);
