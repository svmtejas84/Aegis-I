const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const config = require('./src/config');
const { errorHandler, notFound } = require('./src/middleware/errorHandler');
const socketService = require('./src/services/socket');

// Create Express app
const app = express();

// Create HTTP server for Socket.io
const server = http.createServer(app);

// Initialize Socket.io
socketService.init(server);

// Middleware
app.use(cors({
  origin: config.corsOrigin.split(','),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging (development)
if (config.nodeEnv === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// Health check route
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'AEGIS Backend Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', require('./src/modules/auth/auth.routes'));
app.use('/api/incidents', require('./src/modules/incidents/incident.routes'));
app.use('/api/alerts', require('./src/modules/alerts/alert.routes'));
app.use('/api/check-ins', require('./src/modules/checkIns/checkIn.routes'));
app.use('/api/subscribers', require('./src/modules/subscribers/sunscriber.routes'));
app.use('/api/sms', require('./src/modules/sms/sms.routes'));

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB (optional - will run without it for development)
mongoose.connect(config.mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
  })
  .catch((err) => {
    console.warn('⚠️  MongoDB Connection Failed:', err.message);
    console.warn('⚠️  Server will run without database (some features disabled)');
  });

// Start server regardless of MongoDB connection
server.listen(config.port, () => {
  console.log(`🚀 AEGIS Backend Server running on port ${config.port}`);
  console.log(`📡 Socket.io ready for real-time connections`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
  console.log(`\n📍 API Endpoints:`);
  console.log(`   - Health: http://localhost:${config.port}/health`);
  console.log(`   - Auth: http://localhost:${config.port}/api/auth`);
  console.log(`   - Incidents: http://localhost:${config.port}/api/incidents`);
  console.log(`   - Alerts: http://localhost:${config.port}/api/alerts`);
  console.log(`   - Check-ins: http://localhost:${config.port}/api/check-ins`);
  console.log(`   - Subscribers: http://localhost:${config.port}/api/subscribers`);
  console.log(`   - SMS: http://localhost:${config.port}/api/sms`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.message);
  process.exit(1);
});

module.exports = app;
