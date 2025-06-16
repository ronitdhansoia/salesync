const Consent = require('../models/Consent');
const DataRequest = require('../models/DataRequest');
const Contact = require('../models/Contact');
const Campaign = require('../models/Campaign');
const { logger } = require('../utils/logger');
const emailService = require('./emailService');
const whatsappService = require('./whatsappService');

class DPDPAComplianceService {
  constructor() {
    this.consentExpiryPeriod = 24 * 30; // 24 months default
    this.reminderPeriod = 30; // 30 days before expiry
    this.responseDeadline = 30; // 30 days to respond to data requests
  }

  /**
   * Record consent for data processing
   */
  async recordConsent(consentData) {
    try {
      const {
        userId,
        contactId,
        consentType,
        purpose,
        consentText,
        consentMethod,
        ipAddress,
        userAgent,
        dataCategories,
        processingActivities,
        thirdPartySharing,
        thirdPartyDetails,
        retentionPeriod
      } = consentData;

      // Calculate expiry date
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + this.consentExpiryPeriod);

      const consent = await Consent.create({
        userId,
        contactId,
        consentType,
        purpose,
        consentText,
        consentMethod,
        ipAddress,
        userAgent,
        consentStatus: 'granted',
        consentTimestamp: new Date(),
        expiryDate,
        dataCategories: dataCategories || [],
        processingActivities: processingActivities || [],
        thirdPartySharing: thirdPartySharing || false,
        thirdPartyDetails,
        retentionPeriod: retentionPeriod || '2 years',
        auditTrail: [{
          action: 'consent_granted',
          timestamp: new Date(),
          details: 'Initial consent recorded',
          method: consentMethod,
          ipAddress,
        }],
      });

      logger.info('Consent recorded successfully', {
        consentId: consent.id,
        contactId,
        consentType,
        purpose,
      });

      return consent;
    } catch (error) {
      logger.error('Failed to record consent', {
        error: error.message,
        consentData,
      });
      throw error;
    }
  }

  /**
   * Withdraw consent
   */
  async withdrawConsent(consentId, withdrawalReason, withdrawalMethod) {
    try {
      const consent = await Consent.findByPk(consentId);
      if (!consent) {
        throw new Error('Consent not found');
      }

      const auditEntry = {
        action: 'consent_withdrawn',
        timestamp: new Date(),
        reason: withdrawalReason,
        method: withdrawalMethod,
      };

      await consent.update({
        consentStatus: 'withdrawn',
        withdrawalTimestamp: new Date(),
        auditTrail: [...consent.auditTrail, auditEntry],
      });

      // Stop all processing for this consent
      await this.stopProcessingForConsent(consent);

      logger.info('Consent withdrawn successfully', {
        consentId,
        withdrawalReason,
      });

      return consent;
    } catch (error) {
      logger.error('Failed to withdraw consent', {
        error: error.message,
        consentId,
      });
      throw error;
    }
  }

  /**
   * Check if consent is valid for processing
   */
  async isConsentValid(contactId, consentType, purpose) {
    try {
      const consent = await Consent.findOne({
        where: {
          contactId,
          consentType,
          consentStatus: 'granted',
          isActive: true,
        },
        order: [['consentTimestamp', 'DESC']],
      });

      if (!consent) {
        return { valid: false, reason: 'No valid consent found' };
      }

      // Check if consent has expired
      if (consent.expiryDate && new Date() > consent.expiryDate) {
        await consent.update({ consentStatus: 'expired' });
        return { valid: false, reason: 'Consent has expired' };
      }

      // Check if purpose matches
      if (!consent.processingActivities.includes(purpose)) {
        return { valid: false, reason: 'Purpose not covered by consent' };
      }

      return { valid: true, consent };
    } catch (error) {
      logger.error('Failed to validate consent', {
        error: error.message,
        contactId,
        consentType,
        purpose,
      });
      return { valid: false, reason: 'Error validating consent' };
    }
  }

  /**
   * Handle data subject access request
   */
  async handleAccessRequest(requestData) {
    try {
      const {
        contactId,
        requestDescription,
        requestSource,
        requestedDataCategories,
        deliveryMethod
      } = requestData;

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + this.responseDeadline);

      const dataRequest = await DataRequest.create({
        contactId,
        requestType: 'access',
        requestDescription,
        requestSource,
        requestedDataCategories: requestedDataCategories || [],
        deliveryMethod: deliveryMethod || 'email',
        dueDate,
      });

      // Send acknowledgment
      await this.sendRequestAcknowledgment(dataRequest);

      logger.info('Data access request created', {
        requestId: dataRequest.id,
        contactId,
      });

      return dataRequest;
    } catch (error) {
      logger.error('Failed to handle access request', {
        error: error.message,
        requestData,
      });
      throw error;
    }
  }

  /**
   * Process data access request
   */
  async processAccessRequest(requestId) {
    try {
      const request = await DataRequest.findByPk(requestId, {
        include: [Contact],
      });

      if (!request) {
        throw new Error('Request not found');
      }

      // Update status to in progress
      await request.update({ requestStatus: 'in_progress' });

      // Collect data based on requested categories
      const responseData = await this.collectContactData(
        request.contactId,
        request.requestedDataCategories
      );

      // Update request with response data
      await request.update({
        requestStatus: 'completed',
        responseData,
        completedAt: new Date(),
        actionsPerformed: [...request.actionsPerformed, {
          action: 'data_collected',
          timestamp: new Date(),
          dataCategories: request.requestedDataCategories,
        }],
      });

      // Deliver data to the contact
      await this.deliverAccessData(request, responseData);

      logger.info('Data access request processed', {
        requestId,
        contactId: request.contactId,
      });

      return request;
    } catch (error) {
      logger.error('Failed to process access request', {
        error: error.message,
        requestId,
      });
      throw error;
    }
  }

  /**
   * Handle data erasure request (Right to be forgotten)
   */
  async handleErasureRequest(requestData) {
    try {
      const {
        contactId,
        requestDescription,
        requestSource,
        requestedDataCategories
      } = requestData;

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + this.responseDeadline);

      const dataRequest = await DataRequest.create({
        contactId,
        requestType: 'erasure',
        requestDescription,
        requestSource,
        requestedDataCategories: requestedDataCategories || [],
        dueDate,
      });

      // Send acknowledgment
      await this.sendRequestAcknowledgment(dataRequest);

      logger.info('Data erasure request created', {
        requestId: dataRequest.id,
        contactId,
      });

      return dataRequest;
    } catch (error) {
      logger.error('Failed to handle erasure request', {
        error: error.message,
        requestData,
      });
      throw error;
    }
  }

  /**
   * Process data erasure request
   */
  async processErasureRequest(requestId) {
    try {
      const request = await DataRequest.findByPk(requestId, {
        include: [Contact],
      });

      if (!request) {
        throw new Error('Request not found');
      }

      // Update status to in progress
      await request.update({ requestStatus: 'in_progress' });

      // Check if there are legal reasons to retain data
      const retentionCheck = await this.checkDataRetentionRequirements(
        request.contactId,
        request.requestedDataCategories
      );

      if (retentionCheck.mustRetain) {
        await request.update({
          requestStatus: 'rejected',
          reasonForRejection: retentionCheck.reason,
          legalBasisForRejection: retentionCheck.legalBasis,
          completedAt: new Date(),
        });

        await this.sendErasureRejectionNotice(request, retentionCheck);
        return request;
      }

      // Proceed with erasure
      const erasureResults = await this.eraseContactData(
        request.contactId,
        request.requestedDataCategories
      );

      await request.update({
        requestStatus: 'completed',
        completedAt: new Date(),
        actionsPerformed: [...request.actionsPerformed, {
          action: 'data_erased',
          timestamp: new Date(),
          erasureResults,
        }],
      });

      // Send confirmation
      await this.sendErasureConfirmation(request);

      logger.info('Data erasure request processed', {
        requestId,
        contactId: request.contactId,
        erasureResults,
      });

      return request;
    } catch (error) {
      logger.error('Failed to process erasure request', {
        error: error.message,
        requestId,
      });
      throw error;
    }
  }

  /**
   * Check for expiring consents and send renewal reminders
   */
  async processConsentRenewals() {
    try {
      const reminderDate = new Date();
      reminderDate.setDate(reminderDate.getDate() + this.reminderPeriod);

      const expiringConsents = await Consent.findAll({
        where: {
          consentStatus: 'granted',
          isActive: true,
          reminderSent: false,
          expiryDate: {
            [Op.lte]: reminderDate,
          },
        },
        include: [Contact],
      });

      for (const consent of expiringConsents) {
        await this.sendConsentRenewalReminder(consent);
        
        await consent.update({
          reminderSent: true,
          auditTrail: [...consent.auditTrail, {
            action: 'renewal_reminder_sent',
            timestamp: new Date(),
            expiryDate: consent.expiryDate,
          }],
        });
      }

      logger.info('Consent renewal reminders processed', {
        count: expiringConsents.length,
      });

      return expiringConsents.length;
    } catch (error) {
      logger.error('Failed to process consent renewals', {
        error: error.message,
      });
      throw error;
    }
  }

  /**
   * Generate compliance report
   */
  async generateComplianceReport(startDate, endDate) {
    try {
      const report = {
        period: { startDate, endDate },
        consentMetrics: await this.getConsentMetrics(startDate, endDate),
        dataRequestMetrics: await this.getDataRequestMetrics(startDate, endDate),
        processingActivities: await this.getProcessingActivityReport(startDate, endDate),
        breachIncidents: await this.getBreachIncidents(startDate, endDate),
        retentionCompliance: await this.getRetentionComplianceReport(),
        recommendations: await this.generateComplianceRecommendations(),
      };

      logger.info('Compliance report generated', {
        period: report.period,
        consentCount: report.consentMetrics.totalConsents,
        requestCount: report.dataRequestMetrics.totalRequests,
      });

      return report;
    } catch (error) {
      logger.error('Failed to generate compliance report', {
        error: error.message,
        startDate,
        endDate,
      });
      throw error;
    }
  }

  // Helper methods

  async stopProcessingForConsent(consent) {
    // Implement logic to stop all automated processing for this consent
    // This might involve pausing campaigns, removing from queues, etc.
    logger.info('Stopping processing for withdrawn consent', {
      consentId: consent.id,
      contactId: consent.contactId,
      consentType: consent.consentType,
    });
  }

  async collectContactData(contactId, requestedCategories) {
    // Collect all data for the contact across different systems
    const data = {
      contact: await Contact.findByPk(contactId),
      consents: await Consent.findAll({ where: { contactId } }),
      campaigns: await Campaign.findAll({
        // Campaigns where contact was included
      }),
      // Add other data sources as needed
    };

    return data;
  }

  async deliverAccessData(request, responseData) {
    const contact = request.Contact;
    
    if (request.deliveryMethod === 'email') {
      await emailService.sendDataAccessResponse(contact.email, responseData);
    }
    // Add other delivery methods as needed
  }

  async checkDataRetentionRequirements(contactId, dataCategories) {
    // Check if there are legal requirements to retain certain data
    // This would be customized based on business requirements
    return {
      mustRetain: false,
      reason: null,
      legalBasis: null,
    };
  }

  async eraseContactData(contactId, dataCategories) {
    // Implement actual data erasure logic
    const results = {
      contactData: 'anonymized',
      campaignHistory: 'pseudonymized',
      consents: 'retained_for_legal_basis',
    };

    return results;
  }

  async sendRequestAcknowledgment(request) {
    // Send acknowledgment to the data subject
    logger.info('Sending request acknowledgment', {
      requestId: request.id,
      requestType: request.requestType,
    });
  }

  async sendConsentRenewalReminder(consent) {
    // Send consent renewal reminder
    logger.info('Sending consent renewal reminder', {
      consentId: consent.id,
      expiryDate: consent.expiryDate,
    });
  }

  async sendErasureConfirmation(request) {
    // Send erasure confirmation
    logger.info('Sending erasure confirmation', {
      requestId: request.id,
    });
  }

  async sendErasureRejectionNotice(request, retentionCheck) {
    // Send rejection notice with legal basis
    logger.info('Sending erasure rejection notice', {
      requestId: request.id,
      reason: retentionCheck.reason,
    });
  }

  async getConsentMetrics(startDate, endDate) {
    // Get consent metrics for reporting
    return {
      totalConsents: 0,
      grantedConsents: 0,
      withdrawnConsents: 0,
      expiredConsents: 0,
    };
  }

  async getDataRequestMetrics(startDate, endDate) {
    // Get data request metrics
    return {
      totalRequests: 0,
      accessRequests: 0,
      erasureRequests: 0,
      completedRequests: 0,
      averageResponseTime: 0,
    };
  }

  async getProcessingActivityReport(startDate, endDate) {
    // Get processing activity report
    return [];
  }

  async getBreachIncidents(startDate, endDate) {
    // Get data breach incidents
    return [];
  }

  async getRetentionComplianceReport() {
    // Check retention policy compliance
    return {
      compliantRecords: 0,
      overRetentionRecords: 0,
      actionRequired: [],
    };
  }

  async generateComplianceRecommendations() {
    // Generate recommendations for improving compliance
    return [
      'Regular consent renewal campaigns',
      'Automated data retention cleanup',
      'Enhanced verification procedures',
    ];
  }
}

module.exports = new DPDPAComplianceService();