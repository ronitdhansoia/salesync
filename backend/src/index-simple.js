const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory database (for demo purposes)
const users = [];
const contacts = [];
const campaigns = [];

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3002',
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

// Auth middleware
const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error();
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret');
    const user = users.find(u => u.id === decoded.id);
    
    if (!user) throw new Error();
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'SaleSync India API is running'
  });
});

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, companyName, phoneNumber } = req.body;
    
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ error: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      firstName,
      lastName,
      companyName,
      phoneNumber,
      createdAt: new Date()
    };
    
    users.push(user);
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'demo-secret');
    const { password: _, ...userResponse } = user;
    
    res.status(201).json({ user: userResponse, token });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'demo-secret');
    const { password: _, ...userResponse } = user;
    
    res.json({ user: userResponse, token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Contact routes
app.get('/api/contacts', authMiddleware, (req, res) => {
  const userContacts = contacts.filter(c => c.userId === req.user.id);
  res.json({ contacts: userContacts, total: userContacts.length });
});

app.post('/api/contacts', authMiddleware, (req, res) => {
  const contact = {
    id: Date.now().toString(),
    userId: req.user.id,
    ...req.body,
    createdAt: new Date()
  };
  contacts.push(contact);
  res.status(201).json({ contact });
});

// Campaign routes
app.get('/api/campaigns', authMiddleware, (req, res) => {
  const userCampaigns = campaigns.filter(c => c.userId === req.user.id);
  res.json({ campaigns: userCampaigns, total: userCampaigns.length });
});

app.post('/api/campaigns', authMiddleware, (req, res) => {
  const campaign = {
    id: Date.now().toString(),
    userId: req.user.id,
    status: 'draft',
    ...req.body,
    createdAt: new Date()
  };
  campaigns.push(campaign);
  res.status(201).json({ campaign });
});

// Demo data endpoint
app.get('/api/demo/stats', (req, res) => {
  res.json({
    totalUsers: users.length,
    totalContacts: contacts.length,
    totalCampaigns: campaigns.length,
    features: [
      'WhatsApp Business API',
      'Multi-language Support',
      'Razorpay Integration',
      'DPDP Act Compliant'
    ]
  });
});

// Create demo user
const createDemoUser = async () => {
  const hashedPassword = await bcrypt.hash('demo123', 10);
  users.push({
    id: '1',
    email: 'demo@salesync.in',
    password: hashedPassword,
    firstName: 'Demo',
    lastName: 'User',
    companyName: 'SaleSync Demo',
    phoneNumber: '+919999999999',
    createdAt: new Date()
  });
  console.log('📧 Demo user created: demo@salesync.in / demo123');
};

// Error handling
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, async () => {
  await createDemoUser();
  console.log(`🚀 SaleSync India API running on http://localhost:${PORT}`);
  console.log(`📌 Health check: http://localhost:${PORT}/health`);
  console.log(`📌 Demo stats: http://localhost:${PORT}/api/demo/stats`);
  console.log(`\n🔐 API Endpoints:`);
  console.log(`   POST /api/auth/register`);
  console.log(`   POST /api/auth/login`);
  console.log(`   GET  /api/contacts (auth required)`);
  console.log(`   POST /api/contacts (auth required)`);
  console.log(`   GET  /api/campaigns (auth required)`);
  console.log(`   POST /api/campaigns (auth required)`);
});

module.exports = app;