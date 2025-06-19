const express = require('express');
const { body } = require('express-validator');
const rateLimit = require('express-rate-limit');
const {
  addToWaitlist,
  getWaitlistStats,
  getWaitlistEntries,
  updateWaitlistStatus
} = require('../controllers/waitlistController');
const auth = require('../middleware/auth');

const router = express.Router();

// Rate limiting for public waitlist endpoint
const waitlistRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many waitlist requests, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation middleware
const validateWaitlistEntry = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('source')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Source must be a string between 1 and 50 characters'),
  body('metadata')
    .optional()
    .isObject()
    .withMessage('Metadata must be an object')
];

// Public routes
/**
 * @route POST /api/waitlist
 * @desc Add email to waitlist
 * @access Public
 */
router.post('/', waitlistRateLimit, validateWaitlistEntry, addToWaitlist);

// Admin routes (require authentication)
/**
 * @route GET /api/waitlist/stats
 * @desc Get waitlist statistics
 * @access Private (Admin)
 */
router.get('/stats', auth, getWaitlistStats);

/**
 * @route GET /api/waitlist/entries
 * @desc Get waitlist entries with pagination
 * @access Private (Admin)
 * @query page - Page number (default: 1)
 * @query limit - Entries per page (default: 50, max: 100)
 * @query status - Filter by status (pending, contacted, converted)
 * @query source - Filter by source
 */
router.get('/entries', auth, getWaitlistEntries);

/**
 * @route PUT /api/waitlist/:id/status
 * @desc Update waitlist entry status
 * @access Private (Admin)
 */
router.put('/:id/status', 
  auth,
  [
    body('status')
      .isIn(['pending', 'contacted', 'converted'])
      .withMessage('Status must be one of: pending, contacted, converted')
  ],
  updateWaitlistStatus
);

module.exports = router;