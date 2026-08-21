const Investor = require('../models/Investor');

class InvestorRepository {
  async findById(id) {
    return Investor.findById(id).populate('user', 'name email avatar role bio location');
  }

  async findByUser(userId) {
    return Investor.findOne({ user: userId }).populate('user', 'name email avatar role');
  }

  async create(investorData) {
    return Investor.create(investorData);
  }

  async update(id, updateData) {
    return Investor.findByIdAndUpdate(id, updateData, { new: true });
  }

  async findAll(filter = {}) {
    return Investor.find(filter).populate('user', 'name email avatar role bio location').sort({ createdAt: -1 });
  }
}

module.exports = new InvestorRepository();
