const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('../models/User');
const Startup = require('../models/Startup');
const Investor = require('../models/Investor');
const Mentor = require('../models/Mentor');
const PitchDeck = require('../models/PitchDeck');
const InvestorMatch = require('../models/InvestorMatch');
const InvestmentRequest = require('../models/InvestmentRequest');
const FundingRecord = require('../models/FundingRecord');
const MentorshipRequest = require('../models/MentorshipRequest');
const MentorshipSession = require('../models/MentorshipSession');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const Notification = require('../models/Notification');
const Analytics = require('../models/Analytics');
const AuditLog = require('../models/AuditLog');
const Report = require('../models/Report');
const Payment = require('../models/Payment');
const Subscription = require('../models/Subscription');
const AIAnalysis = require('../models/AIAnalysis');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Like = require('../models/Like');
const Follow = require('../models/Follow');
const FundraisingPipeline = require('../models/FundraisingPipeline');

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ventureconnect';
    await mongoose.connect(mongoUri);

    await Promise.all([
      User.deleteMany({}),
      Startup.deleteMany({}),
      Investor.deleteMany({}),
      Mentor.deleteMany({}),
      PitchDeck.deleteMany({}),
      InvestorMatch.deleteMany({}),
      InvestmentRequest.deleteMany({}),
      FundingRecord.deleteMany({}),
      MentorshipRequest.deleteMany({}),
      MentorshipSession.deleteMany({}),
      Conversation.deleteMany({}),
      Message.deleteMany({}),
      Notification.deleteMany({}),
      Analytics.deleteMany({}),
      AuditLog.deleteMany({}),
      Report.deleteMany({}),
      Payment.deleteMany({}),
      Subscription.deleteMany({}),
      AIAnalysis.deleteMany({}),
      Post.deleteMany({}),
      Comment.deleteMany({}),
      Like.deleteMany({}),
      Follow.deleteMany({}),
      FundraisingPipeline.deleteMany({}),
    ]);

    const adminUser = await User.create({
      name: 'Super Admin',
      email: 'admin@ventureconnect.com',
      password: 'password123',
      role: 'admin',
      bio: 'System Administrator & Governance Lead',
      location: 'Mumbai, India',
    });

    const founder1 = await User.create({
      name: 'Aarav Sharma',
      email: 'aarav@nexusai.io',
      password: 'password123',
      role: 'founder',
      bio: 'Ex-Google ML Engineer building autonomous AI agentic platforms.',
      location: 'Bangalore, India',
    });

    const investor1 = await User.create({
      name: 'Rahul Mehta',
      email: 'rahul@venturecap.com',
      password: 'password123',
      role: 'investor',
      bio: 'Partner at Peak XI Ventures. Investing in Seed to Series A AI/ML & SaaS.',
      location: 'Mumbai, India',
    });

    const mentor1 = await User.create({
      name: 'Vikram Malhotra',
      email: 'vikram@growthmentors.com',
      password: 'password123',
      role: 'mentor',
      bio: 'Ex-VP Growth at Unacademy. Scaled revenues from $1M to $50M.',
      location: 'Gurgaon, India',
    });

    const industries = ['AI/ML', 'HealthTech', 'FinTech', 'SaaS', 'EdTech', 'CleanTech', 'DeepTech', 'PropTech'];
    const stages = ['Idea', 'Pre-Seed', 'Seed', 'Series A'];

    const startupPromises = Array.from({ length: 20 }).map((_, i) => {
      const isNexus = i === 0;
      return Startup.create({
        founder: founder1._id,
        startupName: isNexus ? 'NexusAI Solutions' : `InnovateTech Startup #${i + 1}`,
        tagline: isNexus ? 'Autonomous AI Agents for High-Scale Enterprise Automation' : `Next-gen scalable ${industries[i % industries.length]} platform for modern global markets.`,
        industry: industries[i % industries.length],
        stage: stages[i % stages.length],
        description: `Enterprise-grade platform solving core operational friction with high unit economics.`,
        fundingRequirement: 5000000 + i * 500000,
        fundingRaised: 2000000 + i * 200000,
        equityOffered: 8 + (i % 5),
        investmentType: 'Equity',
        location: i % 2 === 0 ? 'Bangalore, India' : 'Mumbai, India',
        status: i % 3 === 0 ? 'verified' : 'pending',
        potentialScore: 85 + (i % 12),
        metrics: { mrr: 350000 + i * 50000, arr: 4200000 + i * 600000, usersCount: 12000 + i * 2000, growthRate: 20 + i },
      });
    });
    const createdStartups = await Promise.all(startupPromises);

    const investorPromises = Array.from({ length: 10 }).map((_, i) => {
      return Investor.create({
        user: investor1._id,
        firmName: i === 0 ? 'Peak XI Ventures' : `Venture Fund #${i + 1}`,
        investmentRange: { min: 1000000, max: 20000000 },
        industries: [industries[i % industries.length], industries[(i + 1) % industries.length]],
        preferredStages: ['Seed', 'Series A'],
        geography: 'India & SEA',
        investmentTypes: ['Equity', 'SAFE'],
        experienceYears: 8 + i,
        totalInvestments: 12 + i * 2,
        bio: `Active angel investor seeking tech-driven founders with high traction.`,
      });
    });
    await Promise.all(investorPromises);

    const mentorPromises = Array.from({ length: 5 }).map((_, i) => {
      return Mentor.create({
        user: mentor1._id,
        title: i === 0 ? 'VP of Growth & Revenue Strategy' : `Advisory Mentor #${i + 1}`,
        expertise: ['GTM Scaling', 'Product Strategy', 'Fundraising Playbook'],
        experienceYears: 10 + i,
        industry: industries[i % industries.length],
        availability: '5 hrs/week',
        bio: `Experienced advisor helping early founders build repeatable revenue models.`,
        rating: 4.8 + (i % 3) * 0.1,
        reviewsCount: 15 + i * 4,
      });
    });
    await Promise.all(mentorPromises);

    await AuditLog.create({
      admin: adminUser._id,
      action: 'VERIFY_STARTUP',
      targetResource: 'Startup',
      resourceId: createdStartups[0]._id.toString(),
      details: 'Verified startup NexusAI Solutions after diligence review',
      ipAddress: '127.0.0.1',
    });

    console.log('Database seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seed script error:', error);
    process.exit(1);
  }
};

seedData();
