const mongoose = require('mongoose');

const investmentRequestSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true },
    requestType: { type: String, enum: ['founder_to_investor', 'investor_to_founder'], required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    message: { type: String, default: '' },
    proposedAmount: { type: Number, default: 0 },
  },
  { timestamps: true, collection: 'investments' }
);

module.exports = mongoose.model('InvestmentRequest', investmentRequestSchema);
