const validateRegister = (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ success: false, message: 'All fields (name, email, password, role) are required.' });
  }
  if (!['founder', 'investor', 'mentor', 'admin', 'team_member', 'incubator', 'legal'].includes(role)) {
    return res.status(400).json({ success: false, message: 'Invalid role provided.' });
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }
  next();
};

module.exports = { validateRegister, validateLogin };
