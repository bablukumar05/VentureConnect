const FundingRecord = require('../models/FundingRecord');

class FundingRepository {
  async create(recordData) {
    return FundingRecord.create(recordData);
  }

  async findByStartup(startupId) {
    return FundingRecord.find({ startup: startupId }).populate('investor', 'name email').sort({ dealDate: -1 });
  }

  async findByInvestor(investorId) {
    return FundingRecord.find({ investor: investorId }).populate('startup', 'startupName logo industry stage').sort({ dealDate: -1 });
  }

  async aggregateTotalRaised(startupId) {
    const result = await FundingRecord.aggregate([
      { $match: { startup: startupId, status: 'verified' } },
      { $group: { _id: '$startup', totalRaised: { $sum: '$amount' } } },
    ]);
    return result[0]?.totalRaised || 0;
  }
}

module.exports = new FundingRepository();
