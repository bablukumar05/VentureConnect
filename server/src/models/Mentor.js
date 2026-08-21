const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, default: 'VP of Growth & Strategy' },
    expertise: [{ type: String }], // e.g. ["Product Strategy", "Go-To-Market", "Fundraising", "Tech Architecture"]
    experienceYears: { type: Number, default: 12 },
    industry: { type: String, default: 'Technology & SaaS' },
    availability: { type: String, default: '4 hrs/week' },
    bio: { type: String, default: '' },
    hourlyRate: { type: Number, default: 0 }, // 0 for free/community mentoring
    rating: { type: Number, default: 4.9 },
    reviewsCount: { type: Number, default: 28 },
    status: { type: String, enum: ['pending', 'verified', 'blocked'], default: 'verified' }
  },
  { timestamps: true, collection: 'mentors' }
);

module.exports = mongoose.model('Mentor', mentorSchema);
