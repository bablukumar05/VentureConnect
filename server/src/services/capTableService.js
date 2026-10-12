const CapTable = require('../models/CapTable');
const Startup = require('../models/Startup');

/**
 * Gets or creates the default cap table for a startup.
 */
const getCapTable = async (startupId) => {
  let capTable = await CapTable.findOne({ startup: startupId });

  if (!capTable) {
    const startup = await Startup.findById(startupId);
    const founderName = startup?.startupName ? `${startup.startupName} Lead Founder` : 'Aarav Sharma (Founder)';

    capTable = await CapTable.create({
      startup: startupId,
      totalAuthorizedShares: 10000000,
      esopPoolPercentage: 10,
      shareholders: [
        {
          name: founderName,
          shareType: 'Founder Common',
          sharesCount: 5200000,
          ownershipPercentage: 52.0,
          investmentAmount: 0,
        },
        {
          name: 'Core Co-Founder',
          shareType: 'Founder Common',
          sharesCount: 2400000,
          ownershipPercentage: 24.0,
          investmentAmount: 0,
        },
        {
          name: 'Peak XI Ventures (Seed Angel)',
          shareType: 'Angel Preferred',
          sharesCount: 1400000,
          ownershipPercentage: 14.0,
          investmentAmount: 15000000,
        },
        {
          name: 'Unallocated ESOP Talent Pool',
          shareType: 'ESOP Pool',
          sharesCount: 1000000,
          ownershipPercentage: 10.0,
          investmentAmount: 0,
        },
      ],
    });
  }

  return capTable;
};

/**
 * Adds or issues a new share grant.
 */
const addShareholder = async (startupId, { name, shareType, sharesCount, investmentAmount }) => {
  const capTable = await getCapTable(startupId);
  const count = Number(sharesCount) || 100000;
  const newTotal = capTable.totalAuthorizedShares + count;

  capTable.shareholders.push({
    name,
    shareType: shareType || 'Founder Common',
    sharesCount: count,
    ownershipPercentage: (count / newTotal) * 100,
    investmentAmount: Number(investmentAmount) || 0,
  });

  capTable.totalAuthorizedShares = newTotal;

  // Recalculate ownership %
  capTable.shareholders.forEach((s) => {
    s.ownershipPercentage = Number(((s.sharesCount / newTotal) * 100).toFixed(2));
  });

  await capTable.save();
  return capTable;
};

/**
 * Mathematically precise dilution and round simulation engine.
 */
const simulateDilution = async (startupId, {
  preMoneyValuation = 250000000, // ₹25 Cr default
  newInvestment = 50000000,       // ₹5 Cr default
  esopExpansionPercent = 0,      // e.g. 5%
  safeDiscount = 20,              // 20% SAFE discount
  safeCap = 200000000,           // ₹20 Cr valuation cap
}) => {
  const capTable = await getCapTable(startupId);

  const preMoney = Number(preMoneyValuation) || 250000000;
  const investment = Number(newInvestment) || 50000000;
  const esopExpansion = Number(esopExpansionPercent) || 0;

  const postMoney = preMoney + investment;
  const newInvestorEquity = Number(((investment / postMoney) * 100).toFixed(2));
  const totalDilutionFactor = (100 - newInvestorEquity - esopExpansion) / 100;

  const totalExistingShares = capTable.totalAuthorizedShares || 10000000;
  const sharePrice = Number((preMoney / totalExistingShares).toFixed(2));
  const newSharesIssued = Math.round(investment / sharePrice);
  const newTotalShares = totalExistingShares + newSharesIssued;

  // Simulate each shareholder's diluted state & net monetary gain
  const simulatedShareholders = capTable.shareholders.map((s) => {
    const preRoundPct = s.ownershipPercentage;
    const postRoundPct = Number((preRoundPct * totalDilutionFactor).toFixed(2));

    const preMoneyValue = Math.round((preRoundPct / 100) * preMoney);
    const postMoneyValue = Math.round((postRoundPct / 100) * postMoney);
    const netGain = postMoneyValue - preMoneyValue;

    return {
      name: s.name,
      shareType: s.shareType,
      sharesCount: s.sharesCount,
      preRoundPercentage: preRoundPct,
      postRoundPercentage: postRoundPct,
      preMoneyValue,
      postMoneyValue,
      netGain,
    };
  });

  // Incoming new investor entry
  const incomingInvestor = {
    name: 'Incoming Series Institutional Lead',
    shareType: 'VC Series A',
    sharesCount: newSharesIssued,
    preRoundPercentage: 0,
    postRoundPercentage: newInvestorEquity,
    preMoneyValue: 0,
    postMoneyValue: Math.round((newInvestorEquity / 100) * postMoney),
    netGain: investment,
  };

  const allSimulated = [...simulatedShareholders, incomingInvestor];

  if (esopExpansion > 0) {
    allSimulated.push({
      name: 'ESOP Pool Expansion Option',
      shareType: 'ESOP Pool',
      sharesCount: Math.round(newTotalShares * (esopExpansion / 100)),
      preRoundPercentage: 0,
      postRoundPercentage: esopExpansion,
      preMoneyValue: 0,
      postMoneyValue: Math.round((esopExpansion / 100) * postMoney),
      netGain: Math.round((esopExpansion / 100) * postMoney),
    });
  }

  return {
    preMoneyValuation: preMoney,
    newInvestment: investment,
    postMoneyValuation: postMoney,
    sharePrice,
    newSharesIssued,
    newTotalShares,
    newInvestorEquity,
    esopExpansion,
    simulatedShareholders: allSimulated,
  };
};

module.exports = {
  getCapTable,
  addShareholder,
  simulateDilution,
};
