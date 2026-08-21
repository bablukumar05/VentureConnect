const validateStartupCreate = (req, res, next) => {
  const { startupName, tagline, industry, stage, fundingRequirement } = req.body;
  if (!startupName || !tagline || !industry || !stage || !fundingRequirement) {
    return res.status(400).json({
      success: false,
      message: 'startupName, tagline, industry, stage, and fundingRequirement are required fields.',
    });
  }
  next();
};

module.exports = { validateStartupCreate };
