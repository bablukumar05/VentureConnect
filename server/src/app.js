const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

dotenv.config();

const connectDB = require('./config/db');
const socketHandler = require('./sockets/socketHandler');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const startupRoutes = require('./routes/startupRoutes');
const investorRoutes = require('./routes/investorRoutes');
const matchingRoutes = require('./routes/matchingRoutes');
const pitchDeckRoutes = require('./routes/pitchDeckRoutes');
const fundingRoutes = require('./routes/fundingRoutes');
const mentorshipRoutes = require('./routes/mentorshipRoutes');
const chatRoutes = require('./routes/chatRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const adminRoutes = require('./routes/adminRoutes');
const aiRoutes = require('./routes/aiRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const incubatorRoutes = require('./routes/incubatorRoutes');
const legalRoutes = require('./routes/legalRoutes');
const communityRoutes = require('./routes/communityRoutes');
const startupHealthRoutes = require('./routes/startupHealthRoutes');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});
socketHandler(io);

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'VentureConnect API service operational',
    timestamp: new Date(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/investors', investorRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api/pitch-decks', pitchDeckRoutes);
app.use('/api/funding', fundingRoutes);
app.use('/api/mentorship', mentorshipRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/incubator', incubatorRoutes);
app.use('/api/legal', legalRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/startups/health', startupHealthRoutes);

app.use((err, req, res, next) => {
  console.error('[Error]:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = { app, server };
