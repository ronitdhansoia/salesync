const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

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

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'SaleSync India API is running (standalone mode - no database)'
  });
});

// Demo routes without database
app.get('/api/info', (req, res) => {
  res.json({
    name: 'SaleSync India',
    version: '1.0.0',
    description: 'Sales automation platform for Indian B2B market',
    features: [
      'WhatsApp Business API Integration',
      'Multi-language Support (Hindi, English, Tamil, Telugu, Marathi)',
      'Email & SMS Automation',
      'LinkedIn Outreach',
      'Razorpay Payment Integration',
      'DPDP Act 2023 Compliant'
    ]
  });
});

// Demo auth route
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'demo@salesync.in' && password === 'demo123') {
    res.json({
      user: {
        id: '123',
        email: 'demo@salesync.in',
        firstName: 'Demo',
        lastName: 'User',
        companyName: 'SaleSync Demo',
        preferredLanguage: 'en'
      },
      token: 'demo-jwt-token',
      message: 'This is a demo login (no database connected)'
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Demo pricing route
app.get('/api/pricing', (req, res) => {
  res.json({
    plans: [
      {
        name: 'Starter',
        price: 999,
        currency: 'INR',
        features: ['1 user', '1000 messages/month', 'WhatsApp & Email']
      },
      {
        name: 'Growth',
        price: 2999,
        currency: 'INR',
        features: ['3 users', '5000 messages/month', 'All channels', 'API access']
      },
      {
        name: 'Scale',
        price: 9999,
        currency: 'INR',
        features: ['10 users', '20000 messages/month', 'Priority support', 'Custom integrations']
      }
    ]
  });
});

// Error handling
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SaleSync India API running on port ${PORT} (standalone mode)`);
  console.log(`📌 Health check: http://localhost:${PORT}/health`);
  console.log(`📌 API info: http://localhost:${PORT}/api/info`);
  console.log(`📌 Demo login: POST http://localhost:${PORT}/api/auth/login`);
  console.log(`   Email: demo@salesync.in, Password: demo123`);
});

module.exports = app;