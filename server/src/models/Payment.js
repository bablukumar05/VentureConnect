const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    provider: { type: String, enum: ['razorpay', 'stripe'], default: 'razorpay' },
    transactionId: { type: String, required: true },
    orderId: { type: String, default: '' },
    amount: { type: Number, required: true }, // Amount in INR / subunits
    currency: { type: String, default: 'INR' },
    purpose: { type: String, enum: ['subscription', 'funding_deposit', 'mentorship_fee'], required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'completed' },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, collection: 'payments' }
);

module.exports = mongoose.model('Payment', paymentSchema);
