const mongoose = require('mongoose');

const shareHolderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shareType: { type: String, enum: ['Founder Common', 'Angel Preferred', 'ESOP Pool', 'VC Series A'], default: 'Founder Common' },
  sharesCount: { type: Number, required: true },
  ownershipPercentage: { type: Number, required: true },
  investmentAmount: { type: Number, default: 0 },
});

const capTableSchema = new mongoose.Schema(
  {
    startup: { type: mongoose.Schema.Types.ObjectId, ref: 'Startup', required: true, unique: true },
    totalAuthorizedShares: { type: Number, default: 10000000 },
    shareholders: [shareHolderSchema],
    esopPoolPercentage: { type: Number, default: 10 },
  },
  { timestamps: true, collection: 'capTables' }
);

module.exports = mongoose.model('CapTable', capTableSchema);
