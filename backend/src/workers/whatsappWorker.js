const queueService = require('../services/queueService');
const { Message, Contact, Campaign } = require('../models');
const logger = require('../utils/logger');
const WhatsAppService = require('../services/whatsappService');

class WhatsAppWorker {
  constructor() {
    this.isRunning = false;
    this.concurrency = parseInt(process.env.WHATSAPP_WORKER_CONCURRENCY) || 5;
    this.rateLimits = {
      messagesPerMinute: parseInt(process.env.WHATSAPP_RATE_LIMIT_PER_MINUTE) || 20,
      messagesPerHour: parseInt(process.env.WHATSAPP_RATE_LIMIT_PER_HOUR) || 1000,
      messagesPerDay: parseInt(process.env.WHATSAPP_RATE_LIMIT_PER_DAY) || 10000,
    };
    this.messagesSent = {
      minute: { count: 0, resetAt: Date.now() + 60000 },
      hour: { count: 0, resetAt: Date.now() + 3600000 },
      day: { count: 0, resetAt: Date.now() + 86400000 },
    };
  }

  // Start the WhatsApp worker
  start() {
    if (this.isRunning) {
      logger.info('WhatsApp worker already running');
      return;
    }

    this.isRunning = true;
    logger.info('Starting WhatsApp worker');

    // Process WhatsApp message jobs
    queueService.queues.whatsapp.process('send-message', this.concurrency, async (job) => {
      return await this.processMessage(job);
    });

    // Process bulk WhatsApp jobs
    queueService.queues.whatsapp.process('send-bulk', 1, async (job) => {
      return await this.processBulkMessages(job);
    });

    // Process WhatsApp media jobs
    queueService.queues.whatsapp.process('send-media', this.concurrency, async (job) => {
      return await this.processMediaMessage(job);
    });

    logger.info('WhatsApp worker started successfully');
  }

  // Stop the WhatsApp worker
  stop() {
    if (!this.isRunning) {
      logger.info('WhatsApp worker already stopped');
      return;
    }

    this.isRunning = false;
    logger.info('WhatsApp worker stopped');
  }

  // Process a single WhatsApp message
  async processMessage(job) {
    const { 
      campaignId, 
      contactId, 
      templateId, 
      content, 
      channel,
      scheduledFor,
      sequenceStep 
    } = job.data;

    try {
      logger.info('Processing WhatsApp message', {
        jobId: job.id,
        campaignId,
        contactId,
      });

      // Check rate limits
      await this.checkRateLimits();

      // Get contact information
      const contact = await Contact.findByPk(contactId);
      if (!contact) {
        throw new Error(`Contact ${contactId} not found`);
      }

      if (!contact.phone) {
        throw new Error(`Contact ${contactId} has no phone number`);
      }

      // Validate phone number format
      const phoneNumber = this.formatPhoneNumber(contact.phone);
      
      // Create message record
      const message = await Message.create({
        campaignId,
        contactId,
        templateId,
        channel: 'whatsapp',
        content,
        recipientPhone: phoneNumber,
        status: 'pending',
        scheduledFor: scheduledFor || new Date(),
        sequenceStep,
      });

      // Send message via WhatsApp
      const result = await WhatsAppService.sendMessage(phoneNumber, content);

      // Update message with result
      await message.update({
        status: result.success ? 'sent' : 'failed',
        externalId: result.messageId,
        sentAt: result.success ? new Date() : null,
        error: result.success ? null : result.error,
        cost: this.calculateMessageCost(content),
      });

      // Update rate limit counters
      this.updateRateLimitCounters();

      // Update campaign stats
      await this.updateCampaignStats(campaignId, result.success);

      logger.info('WhatsApp message processed successfully', {
        jobId: job.id,
        messageId: message.id,
        status: message.status,
      });

      return {
        success: result.success,
        messageId: message.id,
        externalId: result.messageId,
        cost: message.cost,
      };

    } catch (error) {
      logger.error('Failed to process WhatsApp message', {
        jobId: job.id,
        campaignId,
        contactId,
        error: error.message,
      });

      // Update message status if it was created
      try {
        const message = await Message.findOne({
          where: { campaignId, contactId, status: 'pending' },
          order: [['createdAt', 'DESC']],
        });
        if (message) {
          await message.update({
            status: 'failed',
            error: error.message,
          });
        }
      } catch (updateError) {
        logger.error('Failed to update message status', updateError);
      }

      throw error;
    }
  }

  // Process bulk WhatsApp messages
  async processBulkMessages(job) {
    const { messages, campaignId } = job.data;

    try {
      logger.info('Processing bulk WhatsApp messages', {
        jobId: job.id,
        campaignId,
        count: messages.length,
      });

      const results = [];
      for (const messageData of messages) {
        try {
          // Add individual message to queue with delay
          const individualJob = await queueService.addWhatsAppJob(
            { ...messageData, campaignId },
            { delay: results.length * 2000 } // 2 second delay between messages
          );
          results.push({ success: true, jobId: individualJob.id });
        } catch (error) {
          results.push({ success: false, error: error.message });
        }
      }

      logger.info('Bulk WhatsApp messages queued', {
        jobId: job.id,
        total: messages.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
      });

      return {
        total: messages.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results,
      };

    } catch (error) {
      logger.error('Failed to process bulk WhatsApp messages', {
        jobId: job.id,
        error: error.message,
      });
      throw error;
    }
  }

  // Process WhatsApp media message
  async processMediaMessage(job) {
    const { 
      campaignId, 
      contactId, 
      content, 
      mediaUrl, 
      mediaType,
      caption 
    } = job.data;

    try {
      logger.info('Processing WhatsApp media message', {
        jobId: job.id,
        campaignId,
        contactId,
        mediaType,
      });

      // Check rate limits
      await this.checkRateLimits();

      // Get contact information
      const contact = await Contact.findByPk(contactId);
      if (!contact || !contact.phone) {
        throw new Error(`Contact ${contactId} not found or has no phone number`);
      }

      const phoneNumber = this.formatPhoneNumber(contact.phone);

      // Create message record
      const message = await Message.create({
        campaignId,
        contactId,
        channel: 'whatsapp',
        content: caption || content,
        recipientPhone: phoneNumber,
        status: 'pending',
        mediaUrl,
        mediaType,
      });

      // Send media message
      const result = await WhatsAppService.sendMediaMessage(
        phoneNumber, 
        mediaUrl, 
        mediaType, 
        caption
      );

      // Update message with result
      await message.update({
        status: result.success ? 'sent' : 'failed',
        externalId: result.messageId,
        sentAt: result.success ? new Date() : null,
        error: result.success ? null : result.error,
        cost: this.calculateMediaCost(mediaType),
      });

      this.updateRateLimitCounters();
      await this.updateCampaignStats(campaignId, result.success);

      return {
        success: result.success,
        messageId: message.id,
        externalId: result.messageId,
      };

    } catch (error) {
      logger.error('Failed to process WhatsApp media message', {
        jobId: job.id,
        error: error.message,
      });
      throw error;
    }
  }

  // Check rate limits before sending
  async checkRateLimits() {
    const now = Date.now();

    // Reset counters if time window has passed
    if (now > this.messagesSent.minute.resetAt) {
      this.messagesSent.minute = { count: 0, resetAt: now + 60000 };
    }
    if (now > this.messagesSent.hour.resetAt) {
      this.messagesSent.hour = { count: 0, resetAt: now + 3600000 };
    }
    if (now > this.messagesSent.day.resetAt) {
      this.messagesSent.day = { count: 0, resetAt: now + 86400000 };
    }

    // Check limits
    if (this.messagesSent.minute.count >= this.rateLimits.messagesPerMinute) {
      const waitTime = this.messagesSent.minute.resetAt - now;
      throw new Error(`Rate limit exceeded: ${this.rateLimits.messagesPerMinute} messages per minute. Wait ${Math.ceil(waitTime / 1000)} seconds.`);
    }

    if (this.messagesSent.hour.count >= this.rateLimits.messagesPerHour) {
      const waitTime = this.messagesSent.hour.resetAt - now;
      throw new Error(`Rate limit exceeded: ${this.rateLimits.messagesPerHour} messages per hour. Wait ${Math.ceil(waitTime / 60000)} minutes.`);
    }

    if (this.messagesSent.day.count >= this.rateLimits.messagesPerDay) {
      const waitTime = this.messagesSent.day.resetAt - now;
      throw new Error(`Rate limit exceeded: ${this.rateLimits.messagesPerDay} messages per day. Wait ${Math.ceil(waitTime / 3600000)} hours.`);
    }
  }

  // Update rate limit counters
  updateRateLimitCounters() {
    this.messagesSent.minute.count++;
    this.messagesSent.hour.count++;
    this.messagesSent.day.count++;
  }

  // Format phone number for WhatsApp
  formatPhoneNumber(phone) {
    // Remove all non-digits
    let cleaned = phone.replace(/\D/g, '');
    
    // If starts with 91 (India), use as is
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      return cleaned;
    }
    
    // If 10 digits, add India country code
    if (cleaned.length === 10) {
      return '91' + cleaned;
    }
    
    // If 11 digits and starts with 0, remove 0 and add 91
    if (cleaned.length === 11 && cleaned.startsWith('0')) {
      return '91' + cleaned.substring(1);
    }
    
    return cleaned;
  }

  // Calculate message cost (in paisa)
  calculateMessageCost(content) {
    // WhatsApp Business API pricing (approximate)
    const baseRate = 50; // 50 paisa per message
    const length = content.length;
    
    if (length <= 160) {
      return baseRate;
    } else if (length <= 320) {
      return baseRate * 2;
    } else {
      return baseRate * Math.ceil(length / 160);
    }
  }

  // Calculate media message cost
  calculateMediaCost(mediaType) {
    // Media messages cost more
    const mediaCosts = {
      image: 100, // 1 rupee
      video: 200, // 2 rupees
      audio: 150, // 1.5 rupees
      document: 100, // 1 rupee
    };
    
    return mediaCosts[mediaType] || 100;
  }

  // Update campaign statistics
  async updateCampaignStats(campaignId, success) {
    try {
      const campaign = await Campaign.findByPk(campaignId);
      if (!campaign) return;

      const stats = campaign.stats || {};
      stats.whatsapp = stats.whatsapp || { sent: 0, failed: 0 };
      
      if (success) {
        stats.whatsapp.sent = (stats.whatsapp.sent || 0) + 1;
      } else {
        stats.whatsapp.failed = (stats.whatsapp.failed || 0) + 1;
      }
      
      await campaign.update({ stats });
    } catch (error) {
      logger.error('Failed to update campaign stats', {
        campaignId,
        error: error.message,
      });
    }
  }

  // Get worker statistics
  getStats() {
    return {
      isRunning: this.isRunning,
      concurrency: this.concurrency,
      rateLimits: this.rateLimits,
      messagesSent: this.messagesSent,
    };
  }
}

module.exports = new WhatsAppWorker();