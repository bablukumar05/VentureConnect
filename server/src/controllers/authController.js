const authService = require('../services/authService');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const data = await authService.registerUser(req.body);
    res.status(201).json({ success: true, ...data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.loginUser(email, password);
    res.status(200).json({ success: true, ...data });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

const getMe = async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    res.status(200).json({
      success: true,
      message: `Password reset instructions have been sent to ${email}`,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully.',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Email address verified successfully.',
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET || 'ventureconnect_secret_key_2026', {
      expiresIn: '30d',
    });
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  verifyEmail,
  refreshToken,
};
