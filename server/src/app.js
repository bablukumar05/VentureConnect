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

app.get('/', (req, res) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>VentureConnect API Service</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f8fafc; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
          .card { background: #1e293b; padding: 2.5rem 3rem; border-radius: 1.5rem; border: 1px solid #334155; text-align: center; max-width: 500px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
          h1 { color: #10b981; margin-bottom: 0.5rem; font-size: 1.8rem; }
          p { color: #94a3b8; font-size: 0.95rem; line-height: 1.5; }
          .badge { display: inline-block; background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3); padding: 0.35rem 1rem; border-radius: 9999px; font-size: 0.85rem; font-weight: bold; margin-top: 1rem; }
          a { color: #818cf8; text-decoration: none; font-weight: bold; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>VentureConnect Backend Operational 🚀</h1>
          <p>Enterprise Multi-Tenant Startup Sourcing & Investment API Service is Live.</p>
          <div class="badge">Status: ONLINE 🟢</div>
          <p style="margin-top: 1.5rem; font-size: 0.85rem;">
            Health Endpoint: <a href="/api/health">/api/health</a>
          </p>
        </div>
      </body>
    </html>
  `);
});

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
