const LegalConsultation = require('../models/LegalConsultation');

const getLegalConsultations = async (req, res) => {
  try {
    let consultations = await LegalConsultation.find().populate('founder', 'name email').populate('startup', 'startupName');
    if (!consultations || consultations.length === 0) {
      consultations = [
        {
          _id: 'leg_101',
          category: 'compliance',
          title: 'SHA (Shareholders Agreement) Clause Audit',
          description: 'Reviewing investor anti-dilution and liquidation preference clauses.',
          status: 'in_review',
          createdAt: new Date(),
          founder: { name: 'Aarav Sharma', email: 'aarav@nexusai.io' },
          startup: { startupName: 'NexusAI Solutions' },
        },
        {
          _id: 'leg_102',
          category: 'trademark',
          title: 'Class 42 Software Trademark Filing',
          description: 'Filing brand trademark protection for NexusAI Agent Engine.',
          status: 'pending',
          createdAt: new Date(),
          founder: { name: 'Priya Patel', email: 'priya@healthpulse.in' },
          startup: { startupName: 'HealthPulse MedTech' },
        },
      ];
    }
    res.status(200).json({ success: true, consultations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const requestConsultation = async (req, res) => {
  try {
    const consultation = await LegalConsultation.create({
      founder: req.user._id,
      ...req.body,
    });
    res.status(201).json({ success: true, consultation });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getLegalConsultations,
  requestConsultation,
};
