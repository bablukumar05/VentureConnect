const Cohort = require('../models/Cohort');

const getIncubatorCohorts = async (req, res) => {
  try {
    let cohorts = await Cohort.find({ incubator: req.user._id });
    if (!cohorts || cohorts.length === 0) {
      // Seed initial cohort for incubator manager
      cohorts = [
        await Cohort.create({
          incubator: req.user._id,
          cohortName: 'Winter 2026 Innovation Cohort',
          description: 'High-scale DeepTech & B2B SaaS Acceleration Batch',
          startDate: new Date('2026-01-10'),
          endDate: new Date('2026-06-30'),
          startupsCount: 14,
          demoDayDate: new Date('2026-06-25'),
          applications: [
            { startupName: 'Quantum AI', founderName: 'Siddharth Rao', email: 'sid@quantumai.io', stage: 'Seed', status: 'accepted' },
            { startupName: 'BioHealth Tech', founderName: 'Ananya Roy', email: 'ananya@biohealth.in', stage: 'Pre-Seed', status: 'pending' },
            { startupName: 'SolarGrid IoT', founderName: 'Karan Patel', email: 'karan@solargrid.in', stage: 'Idea', status: 'pending' },
          ],
        }),
      ];
    }
    res.status(200).json({ success: true, cohorts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createCohort = async (req, res) => {
  try {
    const cohort = await Cohort.create({
      incubator: req.user._id,
      ...req.body,
    });
    res.status(201).json({ success: true, cohort });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getIncubatorCohorts,
  createCohort,
};
