const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['founder', 'investor', 'mentor', 'admin', 'team_member', 'incubator', 'legal'],
      required: true,
      default: 'founder',
    },
    avatar: { type: String, default: '' },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    bio: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: 'Mumbai, India' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
  },
  { timestamps: true, collection: 'users' }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
