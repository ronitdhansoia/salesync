const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const dpdpaComplianceService = require('../services/dpdpaComplianceService');
const Consent = require('../models/Consent');
const DataRequest = require('../models/DataRequest');
const Contact = require('../models/Contact');
const { logger } = require('../utils/logger');
const { Op } = require('sequelize');

// Record consent
router.post('/consent', auth, async (req, res) => {
  try {
    const {
      contactId,
      consentType,
      purpose,
      consentText,
      consentMethod,
      dataCategories,
      processingActivities,
      thirdPartySharing,
      thirdPartyDetails,
      retentionPeriod
    } = req.body;

    if (!contactId || !consentType || !purpose || !consentText || !consentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: contactId, consentType, purpose, consentText, consentMethod',
      });
    }

    const consent = await dpdpaComplianceService.recordConsent({
      userId: req.user.id,
      contactId,
      consentType,
      purpose,
      consentText,
      consentMethod,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      dataCategories,
      processingActivities,
      thirdPartySharing,
      thirdPartyDetails,
      retentionPeriod,
    });

    res.json({
      success: true,
      message: 'Consent recorded successfully',
      data: consent,
    });
  } catch (error) {
    logger.error('Failed to record consent', {
      error: error.message,
      userId: req.user.id,
      body: req.body,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to record consent',
    });
  }
});

// Withdraw consent
router.post('/consent/:consentId/withdraw', auth, async (req, res) => {
  try {
    const { consentId } = req.params;
    const { withdrawalReason, withdrawalMethod } = req.body;

    if (!withdrawalReason || !withdrawalMethod) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: withdrawalReason, withdrawalMethod',
      });
    }

    const consent = await dpdpaComplianceService.withdrawConsent(
      consentId,
      withdrawalReason,
      withdrawalMethod
    );

    res.json({
      success: true,
      message: 'Consent withdrawn successfully',
      data: consent,
    });
  } catch (error) {
    logger.error('Failed to withdraw consent', {
      error: error.message,
      consentId: req.params.consentId,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to withdraw consent',
    });
  }
});

// Check consent validity
router.get('/consent/check/:contactId/:consentType', auth, async (req, res) => {
  try {
    const { contactId, consentType } = req.params;
    const { purpose } = req.query;

    const result = await dpdpaComplianceService.isConsentValid(
      contactId,
      consentType,
      purpose
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('Failed to check consent validity', {
      error: error.message,
      contactId: req.params.contactId,
      consentType: req.params.consentType,
      purpose: req.query.purpose,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to check consent validity',
    });
  }
});

// Get all consents for a contact
router.get('/consent/contact/:contactId', auth, async (req, res) => {
  try {
    const { contactId } = req.params;
    const { status, type } = req.query;

    const whereClause = { contactId };
    if (status) whereClause.consentStatus = status;
    if (type) whereClause.consentType = type;

    const consents = await Consent.findAll({
      where: whereClause,
      order: [['consentTimestamp', 'DESC']],
    });

    res.json({
      success: true,
      data: consents,
    });
  } catch (error) {
    logger.error('Failed to get consents for contact', {
      error: error.message,
      contactId: req.params.contactId,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to get consents',
    });
  }
});

// Submit data access request
router.post('/data-request/access', async (req, res) => {
  try {
    const {
      contactEmail,
      contactPhone,
      requestDescription,
      requestSource,
      requestedDataCategories,
      deliveryMethod,
    } = req.body;

    if (!contactEmail && !contactPhone) {
      return res.status(400).json({
        success: false,
        message: 'Either contactEmail or contactPhone is required',
      });
    }

    // Find contact
    const whereClause = {};
    if (contactEmail) whereClause.email = contactEmail;
    if (contactPhone) whereClause.phone = contactPhone;

    const contact = await Contact.findOne({ where: whereClause });
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    const dataRequest = await dpdpaComplianceService.handleAccessRequest({
      contactId: contact.id,
      requestDescription: requestDescription || 'Data access request',
      requestSource: requestSource || 'website_form',
      requestedDataCategories,
      deliveryMethod,
    });

    res.json({
      success: true,
      message: 'Data access request submitted successfully',
      data: {
        requestId: dataRequest.id,
        dueDate: dataRequest.dueDate,
      },
    });
  } catch (error) {
    logger.error('Failed to submit data access request', {
      error: error.message,
      body: req.body,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to submit data access request',
    });
  }
});

// Submit data erasure request
router.post('/data-request/erasure', async (req, res) => {
  try {
    const {
      contactEmail,
      contactPhone,
      requestDescription,
      requestSource,
      requestedDataCategories,
    } = req.body;

    if (!contactEmail && !contactPhone) {
      return res.status(400).json({
        success: false,
        message: 'Either contactEmail or contactPhone is required',
      });
    }

    // Find contact
    const whereClause = {};
    if (contactEmail) whereClause.email = contactEmail;
    if (contactPhone) whereClause.phone = contactPhone;

    const contact = await Contact.findOne({ where: whereClause });
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found',
      });
    }

    const dataRequest = await dpdpaComplianceService.handleErasureRequest({
      contactId: contact.id,
      requestDescription: requestDescription || 'Data erasure request',
      requestSource: requestSource || 'website_form',
      requestedDataCategories,
    });

    res.json({
      success: true,
      message: 'Data erasure request submitted successfully',
      data: {
        requestId: dataRequest.id,
        dueDate: dataRequest.dueDate,
      },
    });
  } catch (error) {
    logger.error('Failed to submit data erasure request', {
      error: error.message,
      body: req.body,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to submit data erasure request',
    });
  }
});

// Get data request status
router.get('/data-request/:requestId/status', async (req, res) => {
  try {
    const { requestId } = req.params;

    const dataRequest = await DataRequest.findByPk(requestId, {
      attributes: [
        'id',
        'requestType',
        'requestStatus',
        'dueDate',
        'completedAt',
        'reasonForRejection',
        'createdAt',
      ],
    });

    if (!dataRequest) {
      return res.status(404).json({
        success: false,
        message: 'Data request not found',
      });
    }

    res.json({
      success: true,
      data: dataRequest,
    });
  } catch (error) {
    logger.error('Failed to get data request status', {
      error: error.message,
      requestId: req.params.requestId,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to get data request status',
    });
  }
});

// Process data request (admin only)
router.post('/data-request/:requestId/process', auth, async (req, res) => {
  try {
    const { requestId } = req.params;

    const dataRequest = await DataRequest.findByPk(requestId);
    if (!dataRequest) {
      return res.status(404).json({
        success: false,
        message: 'Data request not found',
      });
    }

    let result;
    if (dataRequest.requestType === 'access') {
      result = await dpdpaComplianceService.processAccessRequest(requestId);
    } else if (dataRequest.requestType === 'erasure') {
      result = await dpdpaComplianceService.processErasureRequest(requestId);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Unsupported request type',
      });
    }

    res.json({
      success: true,
      message: 'Data request processed successfully',
      data: result,
    });
  } catch (error) {
    logger.error('Failed to process data request', {
      error: error.message,
      requestId: req.params.requestId,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to process data request',
    });
  }
});

// Get all data requests (admin only)
router.get('/data-requests', auth, async (req, res) => {
  try {
    const { status, type, page = 1, limit = 20 } = req.query;

    const whereClause = {};
    if (status) whereClause.requestStatus = status;
    if (type) whereClause.requestType = type;

    const offset = (page - 1) * limit;

    const { count, rows: dataRequests } = await DataRequest.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Contact,
          attributes: ['id', 'firstName', 'lastName', 'email', 'phone'],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      success: true,
      data: {
        requests: dataRequests,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(count / limit),
          totalCount: count,
          hasNext: offset + limit < count,
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    logger.error('Failed to get data requests', {
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to get data requests',
    });
  }
});

// Generate compliance report (admin only)
router.get('/report', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'startDate and endDate are required',
      });
    }

    const report = await dpdpaComplianceService.generateComplianceReport(
      new Date(startDate),
      new Date(endDate)
    );

    res.json({
      success: true,
      data: report,
    });
  } catch (error) {
    logger.error('Failed to generate compliance report', {
      error: error.message,
      userId: req.user.id,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to generate compliance report',
    });
  }
});

// Get consent dashboard stats (admin only)
router.get('/stats', auth, async (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const stats = {
      totalConsents: await Consent.count(),
      activeConsents: await Consent.count({
        where: { consentStatus: 'granted', isActive: true },
      }),
      expiredConsents: await Consent.count({
        where: { consentStatus: 'expired' },
      }),
      withdrawnConsents: await Consent.count({
        where: { consentStatus: 'withdrawn' },
      }),
      pendingRequests: await DataRequest.count({
        where: { requestStatus: 'pending' },
      }),
      completedRequests: await DataRequest.count({
        where: { requestStatus: 'completed' },
      }),
      recentActivity: {
        newConsents: await Consent.count({
          where: {
            createdAt: { [Op.gte]: thirtyDaysAgo },
          },
        }),
        newRequests: await DataRequest.count({
          where: {
            createdAt: { [Op.gte]: thirtyDaysAgo },
          },
        }),
      },
    };

    // Get expiring consents (next 30 days)
    const futureDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    stats.expiringConsents = await Consent.count({
      where: {
        consentStatus: 'granted',
        isActive: true,
        expiryDate: {
          [Op.between]: [now, futureDate],
        },
      },
    });

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    logger.error('Failed to get compliance stats', {
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to get compliance stats',
    });
  }
});

// Process consent renewals (admin only - typically run via cron)
router.post('/process-renewals', auth, async (req, res) => {
  try {
    const processedCount = await dpdpaComplianceService.processConsentRenewals();

    res.json({
      success: true,
      message: `Processed ${processedCount} consent renewal reminders`,
      data: { processedCount },
    });
  } catch (error) {
    logger.error('Failed to process consent renewals', {
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to process consent renewals',
    });
  }
});

module.exports = router;