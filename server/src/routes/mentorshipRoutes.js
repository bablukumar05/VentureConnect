const express = require('express');
const router = express.Router();
const {
  getAllMentors,
  requestMentorship,
  getMentorshipRequests,
  respondMentorship,
  getSessions,
} = require('../controllers/mentorshipController');
const { protect } = require('../middleware/authMiddleware');

router.get('/mentors', getAllMentors);
router.post('/request', protect, requestMentorship);
router.get('/requests', protect, getMentorshipRequests);
router.post('/respond', protect, respondMentorship);
router.get('/sessions', protect, getSessions);

module.exports = router;
