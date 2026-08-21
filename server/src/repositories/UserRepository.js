const User = require('../models/User');

class UserRepository {
  async findById(id) {
    return User.findById(id).select('-password');
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }

  async create(userData) {
    return User.create(userData);
  }

  async update(id, updateData) {
    return User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
  }

  async delete(id) {
    return User.findByIdAndDelete(id);
  }

  async findAll(query = {}) {
    return User.find(query).select('-password').sort({ createdAt: -1 });
  }
}

module.exports = new UserRepository();
