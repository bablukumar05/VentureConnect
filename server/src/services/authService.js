const User = require('../models/User');
const Investor = require('../models/Investor');
const Mentor = require('../models/Mentor');
const jwt = require('jsonwebtoken');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'ventureconnect_secret_jwt_key_2026_super_secure', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

const registerUser = async (userData) => {
  const { name, email, password, role, bio, location, phone } = userData;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists with this email');
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || 'founder',
    bio: bio || '',
    location: location || 'Mumbai, India',
    phone: phone || '',
    isVerified: true,
  });

  // Automatically create default role profiles if investor or mentor
  if (role === 'investor') {
    await Investor.create({
      user: user._id,
      firmName: `${name}'s Capital`,
      bio: bio || 'Active Angel Investor',
    });
  } else if (role === 'mentor') {
    await Mentor.create({
      user: user._id,
      title: 'Advisor & Startup Mentor',
      bio: bio || 'Experienced startup mentor and advisor',
    });
  }

  const token = generateToken(user._id, user.role);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    token,
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Invalid email or password');
  }

  if (!user.isActive) {
    throw new Error('Your account has been deactivated or blocked by Admin');
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id, user.role);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
    bio: user.bio,
    location: user.location,
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
  generateToken,
};
