const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    targetType: { type: String, enum: ['mentor', 'investor'], default: 'mentor' }
  },
  { timestamps: true, collection: 'reviews' }
);

module.exports = mongoose.model('Review', reviewSchema);
