const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getLegalConsultations, requestConsultation } = require('../controllers/legalController');

router.get('/consultations', protect, getLegalConsultations);
router.post('/consultations', protect, requestConsultation);

module.exports = router;
