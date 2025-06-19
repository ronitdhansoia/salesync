const { Waitlist } = require('../models');
const { validationResult } = require('express-validator');
const logger = require('../utils/logger');

/**
 * Add email to waitlist
 */
const addToWaitlist = async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, source = 'website' } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    // Extract metadata from request
    const metadata = {
      referrer: req.get('Referer'),
      timestamp: new Date().toISOString(),
      ...(req.body.metadata && typeof req.body.metadata === 'object' ? req.body.metadata : {})
    };

    // Check if email already exists
    const existingEntry = await Waitlist.findOne({ where: { email } });
    if (existingEntry) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists on waitlist',
        data: {
          email,
          joinedAt: existingEntry.createdAt
        }
      });
    }

    // Create new waitlist entry
    const waitlistEntry = await Waitlist.create({
      email,
      source,
      ipAddress,
      userAgent,
      metadata
    });

    logger.info(`New waitlist signup: ${email} from ${source}`, {
      email,
      source,
      ipAddress,
      id: waitlistEntry.id
    });

    res.status(201).json({
      success: true,
      message: 'Successfully added to waitlist',
      data: {
        id: waitlistEntry.id,
        email: waitlistEntry.email,
        source: waitlistEntry.source,
        joinedAt: waitlistEntry.createdAt
      }
    });

  } catch (error) {
    logger.error('Error adding to waitlist:', error);
    
    // Handle unique constraint error
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        message: 'Email already exists on waitlist'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * Get waitlist statistics (admin only)
 */
const getWaitlistStats = async (req, res) => {
  try {
    const [total, pending, contacted, converted] = await Promise.all([
      Waitlist.count(),
      Waitlist.count({ where: { status: 'pending' } }),
      Waitlist.count({ where: { status: 'contacted' } }),
      Waitlist.count({ where: { status: 'converted' } })
    ]);

    // Get recent signups (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentSignups = await Waitlist.count({
      where: {
        createdAt: {
          [require('sequelize').Op.gte]: sevenDaysAgo
        }
      }
    });

    res.json({
      success: true,
      data: {
        total,
        byStatus: {
          pending,
          contacted,
          converted
        },
        recentSignups
      }
    });

  } catch (error) {
    logger.error('Error fetching waitlist stats:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Get waitlist entries (admin only)
 */
const getWaitlistEntries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;
    const status = req.query.status;
    const source = req.query.source;

    const whereClause = {};
    if (status) whereClause.status = status;
    if (source) whereClause.source = source;

    const { count, rows: entries } = await Waitlist.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit,
      offset,
      attributes: ['id', 'email', 'source', 'status', 'createdAt', 'updatedAt']
    });

    res.json({
      success: true,
      data: {
        entries,
        pagination: {
          total: count,
          page,
          limit,
          totalPages: Math.ceil(count / limit)
        }
      }
    });

  } catch (error) {
    logger.error('Error fetching waitlist entries:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

/**
 * Update waitlist entry status (admin only)
 */
const updateWaitlistStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'contacted', 'converted'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      });
    }

    const [updatedRows] = await Waitlist.update(
      { status },
      { where: { id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Waitlist entry not found'
      });
    }

    const updatedEntry = await Waitlist.findByPk(id, {
      attributes: ['id', 'email', 'source', 'status', 'createdAt', 'updatedAt']
    });

    logger.info(`Waitlist status updated: ${updatedEntry.email} -> ${status}`, {
      id,
      email: updatedEntry.email,
      status,
      updatedBy: req.user?.id
    });

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: updatedEntry
    });

  } catch (error) {
    logger.error('Error updating waitlist status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  addToWaitlist,
  getWaitlistStats,
  getWaitlistEntries,
  updateWaitlistStatus
};