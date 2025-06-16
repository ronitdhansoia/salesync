const bcrypt = require('bcryptjs');
const { User, Subscription } = require('../models');
const { generateAuthToken } = require('../middleware/auth');
const { logger } = require('../utils/logger');

const register = async (req, res, next) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      companyName,
      phoneNumber,
      preferredLanguage
    } = req.body;

    const existingUser = await User.findOne({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists with this email'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      companyName,
      phoneNumber,
      preferredLanguage: preferredLanguage || 'en'
    });

    // Create free subscription
    await Subscription.create({
      userId: user.id,
      plan: 'free',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    const token = generateAuthToken(user.id);

    const userResponse = user.toJSON();
    delete userResponse.password;

    logger.info(`New user registered: ${user.email}`);

    res.status(201).json({
      user: userResponse,
      token
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [{
        model: Subscription,
        attributes: ['plan', 'status', 'currentPeriodEnd']
      }]
    });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        error: 'Account is deactivated'
      });
    }

    await user.update({
      lastLoginAt: new Date()
    });

    const token = generateAuthToken(user.id);

    const userResponse = user.toJSON();
    delete userResponse.password;

    logger.info(`User logged in: ${user.email}`);

    res.json({
      user: userResponse,
      token
    });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
      include: [{
        model: Subscription,
        attributes: ['plan', 'status', 'currentPeriodEnd', 'limits', 'usage']
      }]
    });

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const updates = [
      'firstName',
      'lastName',
      'companyName',
      'phoneNumber',
      'preferredLanguage',
      'timezone',
      'gstNumber'
    ].reduce((acc, field) => {
      if (req.body[field] !== undefined) {
        acc[field] = req.body[field];
      }
      return acc;
    }, {});

    await req.user.update(updates);

    res.json({
      message: 'Profile updated successfully',
      user: req.user
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findByPk(req.user.id);
    
    if (!await bcrypt.compare(currentPassword, user.password)) {
      return res.status(401).json({
        error: 'Current password is incorrect'
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    res.json({
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  me,
  updateProfile,
  changePassword
};