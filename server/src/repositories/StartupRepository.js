const Startup = require('../models/Startup');

class StartupRepository {
  async findById(id) {
    return Startup.findById(id).populate('founder', 'name email avatar role bio location');
  }

  async findByFounder(founderId) {
    return Startup.findOne({ founder: founderId }).populate('founder', 'name email avatar role');
  }

  async create(startupData) {
    return Startup.create(startupData);
  }

  async update(id, updateData) {
    return Startup.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id) {
    return Startup.findByIdAndDelete(id);
  }

  async findAll(filter = {}, sort = { createdAt: -1 }) {
    return Startup.find(filter).populate('founder', 'name email avatar role').sort(sort);
  }

  async updateStatus(id, status) {
    return Startup.findByIdAndUpdate(id, { status }, { new: true });
  }
}

module.exports = new StartupRepository();
