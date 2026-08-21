const mentorshipService = require('../services/mentorshipService');

const getAllMentors = async (req, res) => {
  try {
    const mentors = await mentorshipService.getAllMentors(req.query);
    res.status(200).json({ success: true, mentors });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const requestMentorship = async (req, res) => {
  try {
    const request = await mentorshipService.createMentorshipRequest(req.user._id, req.body);
    res.status(201).json({ success: true, request });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getMentorshipRequests = async (req, res) => {
  try {
    const requests = await mentorshipService.getMentorshipRequestsForUser(req.user._id, req.user.role);
    res.status(200).json({ success: true, requests });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const respondMentorship = async (req, res) => {
  try {
    const requestId = req.body.requestId || req.body.id || req.body.request_id;
    const status = req.body.status || 'accepted';

    if (!requestId) {
      return res.status(400).json({ success: false, message: 'requestId is required' });
    }

    const request = await mentorshipService.respondToMentorshipRequest(requestId, status);
    res.status(200).json({ success: true, request });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getSessions = async (req, res) => {
  try {
    const sessions = await mentorshipService.getSessionsForUser(req.user._id, req.user.role);
    res.status(200).json({ success: true, sessions });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllMentors,
  requestMentorship,
  getMentorshipRequests,
  respondMentorship,
  getSessions,
};
