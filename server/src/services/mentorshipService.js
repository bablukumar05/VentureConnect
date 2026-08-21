const mongoose = require('mongoose');
const Mentor = require('../models/Mentor');
const MentorshipRequest = require('../models/MentorshipRequest');
const MentorshipSession = require('../models/MentorshipSession');
const Notification = require('../models/Notification');

const getAllMentors = async (filters = {}) => {
  const query = { status: 'verified' };
  if (filters.expertise) {
    query.expertise = { $in: [new RegExp(filters.expertise, 'i')] };
  }
  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { bio: { $regex: filters.search, $options: 'i' } },
    ];
  }
  return await Mentor.find(query).populate('user', 'name email avatar location bio linkedin');
};

const createMentorshipRequest = async (founderId, requestData) => {
  const { mentorUserId, startupId, topic, goals, message } = requestData;

  const request = await MentorshipRequest.create({
    founder: founderId,
    mentor: mentorUserId,
    startup: startupId,
    topic,
    goals,
    message,
    status: 'pending',
  });

  // Create notification for mentor
  await Notification.create({
    recipient: mentorUserId,
    sender: founderId,
    type: 'mentorship',
    title: 'New Mentorship Request',
    message: `You have received a new mentorship request regarding: ${topic}`,
    link: '/mentor/requests',
  });

  return request;
};

const getMentorshipRequestsForUser = async (userId, role) => {
  const query = role === 'mentor' ? { mentor: userId } : { founder: userId };
  return await MentorshipRequest.find(query)
    .populate('founder', 'name email avatar')
    .populate('mentor', 'name email avatar')
    .populate('startup', 'startupName')
    .sort({ createdAt: -1 });
};

const respondToMentorshipRequest = async (requestId, status) => {
  let request = null;

  if (requestId && mongoose.Types.ObjectId.isValid(requestId)) {
    request = await MentorshipRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    ).populate('founder mentor');
  }

  if (request) {
    if (status === 'accepted') {
      await MentorshipSession.create({
        request: request._id,
        founder: request.founder._id,
        mentor: request.mentor._id,
        sessionTitle: `Kickoff: ${request.topic}`,
        date: new Date(Date.now() + 86400000 * 2), // 2 days later
        meetingLink: 'https://meet.google.com/vc-mentor-session',
        status: 'scheduled',
        tasks: [
          { title: 'Define 30-day growth KPIs', isCompleted: false },
          { title: 'Review investor pitch script', isCompleted: false },
        ],
      });
    }

    if (request.founder) {
      await Notification.create({
        recipient: request.founder._id,
        sender: request.mentor?._id,
        type: 'mentorship',
        title: `Mentorship Request ${status.toUpperCase()}`,
        message: `Your mentor request has been ${status}.`,
        link: '/founder/mentors',
      });
    }
  }

  return request || { _id: requestId, status };
};

const getSessionsForUser = async (userId, role) => {
  const query = role === 'mentor' ? { mentor: userId } : { founder: userId };
  return await MentorshipSession.find(query)
    .populate('founder', 'name email avatar')
    .populate('mentor', 'name email avatar')
    .sort({ date: 1 });
};

module.exports = {
  getAllMentors,
  createMentorshipRequest,
  getMentorshipRequestsForUser,
  respondToMentorshipRequest,
  getSessionsForUser,
};
