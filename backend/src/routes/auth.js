const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/auth');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/register', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  body('phoneNumber').optional().matches(/^(\+91)?[6-9]\d{9}$/).withMessage('Invalid Indian phone number'),
  validate
], authController.register);

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
  validate
], authController.login);

router.get('/me', authMiddleware, authController.me);

router.put('/profile', authMiddleware, [
  body('firstName').optional().notEmpty().trim(),
  body('lastName').optional().notEmpty().trim(),
  body('phoneNumber').optional().matches(/^(\+91)?[6-9]\d{9}$/),
  body('gstNumber').optional().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/),
  validate
], authController.updateProfile);

router.post('/change-password', authMiddleware, [
  body('currentPassword').notEmpty(),
  body('newPassword').isLength({ min: 8 }),
  validate
], authController.changePassword);

module.exports = router;