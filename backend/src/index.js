const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const contactRoutes = require('./routes/contacts');
const campaignRoutes = require('./routes/campaigns');
const whatsappRoutes = require('./routes/whatsapp');
const analyticsRoutes = require('./routes/analytics');
const paymentRoutes = require('./routes/payments');
const automationRoutes = require('./routes/automation');
const complianceRoutes = require('./routes/compliance');
const waitlistRoutes = require('./routes/waitlist');

const { sequelize } = require('./models');
const { logger } = require('./utils/logger');
const { errorHandler } = require('./middleware/errorHandler');

// Import automation services
const campaignExecutionService = require('./services/campaignExecutionService');
const whatsappWorker = require('./workers/whatsappWorker');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/whatsapp', whatsappRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/automation', automationRoutes);
app.use('/api/compliance', complianceRoutes);
app.use('/api/waitlist', waitlistRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// Database connection and server start
async function startServer() {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established successfully');
    
    await sequelize.sync({ alter: true });
    logger.info('Database synced');
    
    // Start automation services
    try {
      campaignExecutionService.start();
      logger.info('Campaign execution service started');
      
      whatsappWorker.start();
      logger.info('WhatsApp worker started');
    } catch (automationError) {
      logger.warn('Failed to start automation services:', automationError.message);
    }
    
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Unable to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  campaignExecutionService.stop();
  whatsappWorker.stop();
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  campaignExecutionService.stop();
  whatsappWorker.stop();
  process.exit(0);
});

startServer();

module.exports = app;