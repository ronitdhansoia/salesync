const queueService = require('./queueService');
const { Campaign, Contact, Message, Template } = require('../models');
const logger = require('../utils/logger');
const cron = require('node-cron');

class CampaignExecutionService {
  constructor() {
    this.isRunning = false;
    this.scheduledJobs = new Map();
  }

  // Start the campaign execution service
  start() {
    if (this.isRunning) {
      logger.info('Campaign execution service already running');
      return;
    }

    this.isRunning = true;
    logger.info('Starting campaign execution service');

    // Schedule immediate campaigns check (every minute)
    this.scheduledJobs.set('immediate', cron.schedule('* * * * *', async () => {
      await this.processImmediateCampaigns();
    }));

    // Schedule delayed campaigns check (every 5 minutes)
    this.scheduledJobs.set('delayed', cron.schedule('*/5 * * * *', async () => {
      await this.processDelayedCampaigns();
    }));

    // Schedule recurring campaigns check (every hour)
    this.scheduledJobs.set('recurring', cron.schedule('0 * * * *', async () => {
      await this.processRecurringCampaigns();
    }));

    logger.info('Campaign execution service started successfully');
  }

  // Stop the campaign execution service
  stop() {
    if (!this.isRunning) {
      logger.info('Campaign execution service already stopped');
      return;
    }

    this.isRunning = false;
    
    // Stop all scheduled jobs
    this.scheduledJobs.forEach((job, name) => {
      job.destroy();
      logger.info(`Stopped scheduled job: ${name}`);
    });
    this.scheduledJobs.clear();

    logger.info('Campaign execution service stopped');
  }

  // Process campaigns that should start immediately
  async processImmediateCampaigns() {
    try {
      const campaigns = await Campaign.findAll({
        where: {
          status: 'scheduled',
          startDate: {
            [require('sequelize').Op.lte]: new Date(),
          },
        },
        include: [
          {
            model: Contact,
            as: 'contacts',
            through: { attributes: [] },
          },
          {
            model: Template,
            as: 'templates',
          },
        ],
      });

      for (const campaign of campaigns) {
        await this.executeCampaign(campaign);
      }
    } catch (error) {
      logger.error('Failed to process immediate campaigns', {
        error: error.message,
      });
    }
  }

  // Process campaigns with delays/sequences
  async processDelayedCampaigns() {
    try {
      // Find campaigns with active sequences
      const campaigns = await Campaign.findAll({
        where: {
          status: 'active',
          type: 'sequence',
        },
        include: [
          {
            model: Contact,
            as: 'contacts',
            through: { attributes: ['lastMessageSent', 'sequenceStep'] },
          },
          {
            model: Template,
            as: 'templates',
          },
        ],
      });

      for (const campaign of campaigns) {
        await this.processSequenceCampaign(campaign);
      }
    } catch (error) {
      logger.error('Failed to process delayed campaigns', {
        error: error.message,
      });
    }
  }

  // Process recurring campaigns
  async processRecurringCampaigns() {
    try {
      const campaigns = await Campaign.findAll({
        where: {
          status: 'active',
          type: 'recurring',
        },
      });

      for (const campaign of campaigns) {
        await this.checkRecurringCampaign(campaign);
      }
    } catch (error) {
      logger.error('Failed to process recurring campaigns', {
        error: error.message,
      });
    }
  }

  // Execute a single campaign
  async executeCampaign(campaign) {
    try {
      logger.info(`Executing campaign: ${campaign.name}`, {
        campaignId: campaign.id,
        type: campaign.type,
        channel: campaign.channel,
      });

      // Update campaign status
      await campaign.update({ status: 'active', startedAt: new Date() });

      // Get campaign contacts
      const contacts = campaign.contacts || await campaign.getContacts();
      if (!contacts || contacts.length === 0) {
        logger.warn(`No contacts found for campaign ${campaign.id}`);
        return;
      }

      // Process based on campaign type
      switch (campaign.type) {
        case 'immediate':
          await this.executeImmediateCampaign(campaign, contacts);
          break;
        case 'sequence':
          await this.executeSequenceCampaign(campaign, contacts);
          break;
        case 'recurring':
          await this.executeRecurringCampaign(campaign, contacts);
          break;
        default:
          throw new Error(`Unknown campaign type: ${campaign.type}`);
      }

      logger.info(`Campaign executed successfully: ${campaign.name}`);
    } catch (error) {
      logger.error(`Failed to execute campaign ${campaign.id}`, {
        error: error.message,
      });
      
      // Update campaign status to failed
      await campaign.update({ 
        status: 'failed', 
        error: error.message,
        completedAt: new Date(),
      });
    }
  }

  // Execute immediate campaign (send to all contacts at once)
  async executeImmediateCampaign(campaign, contacts) {
    const template = campaign.templates?.[0];
    if (!template) {
      throw new Error(`No template found for campaign ${campaign.id}`);
    }

    const jobs = [];
    for (const contact of contacts) {
      const messageData = {
        campaignId: campaign.id,
        contactId: contact.id,
        templateId: template.id,
        channel: campaign.channel,
        content: await this.personalizeMessage(template.content, contact),
        scheduledFor: new Date(),
      };

      // Add to appropriate queue based on channel
      const job = await this.addMessageToQueue(campaign.channel, messageData);
      jobs.push(job);
    }

    // Update campaign with completion
    await campaign.update({ 
      status: 'completed',
      completedAt: new Date(),
      totalMessages: jobs.length,
    });

    return jobs;
  }

  // Execute sequence campaign (send messages with delays)
  async executeSequenceCampaign(campaign, contacts) {
    const templates = campaign.templates || [];
    if (templates.length === 0) {
      throw new Error(`No templates found for sequence campaign ${campaign.id}`);
    }

    for (const contact of contacts) {
      // Start sequence for each contact
      await this.startContactSequence(campaign, contact, templates);
    }
  }

  // Process sequence campaign for existing contacts
  async processSequenceCampaign(campaign) {
    const contacts = campaign.contacts || [];
    const templates = campaign.templates || [];

    for (const contact of contacts) {
      const pivot = contact.CampaignContact;
      if (!pivot) continue;

      const lastMessageSent = pivot.lastMessageSent;
      const currentStep = pivot.sequenceStep || 0;
      const nextTemplate = templates[currentStep];

      if (!nextTemplate) {
        // Sequence completed for this contact
        continue;
      }

      // Check if it's time to send next message
      const delay = nextTemplate.delay || 0; // delay in minutes
      const nextSendTime = new Date(lastMessageSent);
      nextSendTime.setMinutes(nextSendTime.getMinutes() + delay);

      if (new Date() >= nextSendTime) {
        await this.sendSequenceMessage(campaign, contact, nextTemplate, currentStep + 1);
      }
    }
  }

  // Start sequence for a contact
  async startContactSequence(campaign, contact, templates) {
    const firstTemplate = templates[0];
    if (!firstTemplate) return;

    await this.sendSequenceMessage(campaign, contact, firstTemplate, 1);
  }

  // Send a sequence message
  async sendSequenceMessage(campaign, contact, template, step) {
    try {
      const messageData = {
        campaignId: campaign.id,
        contactId: contact.id,
        templateId: template.id,
        channel: campaign.channel,
        content: await this.personalizeMessage(template.content, contact),
        sequenceStep: step,
        scheduledFor: new Date(),
      };

      // Add to queue
      await this.addMessageToQueue(campaign.channel, messageData);

      // Update contact's sequence progress
      await contact.CampaignContact.update({
        lastMessageSent: new Date(),
        sequenceStep: step,
      });

      logger.info(`Sequence message sent`, {
        campaignId: campaign.id,
        contactId: contact.id,
        step: step,
      });
    } catch (error) {
      logger.error(`Failed to send sequence message`, {
        campaignId: campaign.id,
        contactId: contact.id,
        step: step,
        error: error.message,
      });
    }
  }

  // Execute recurring campaign
  async executeRecurringCampaign(campaign, contacts) {
    // Check if it's time for next occurrence
    const lastRun = campaign.lastRunAt || campaign.createdAt;
    const interval = campaign.settings?.interval || 'daily';
    
    if (!this.shouldRunRecurringCampaign(lastRun, interval)) {
      return;
    }

    // Execute as immediate campaign
    await this.executeImmediateCampaign(campaign, contacts);
    
    // Update last run time
    await campaign.update({ lastRunAt: new Date() });
  }

  // Check if recurring campaign should run
  shouldRunRecurringCampaign(lastRun, interval) {
    const now = new Date();
    const lastRunDate = new Date(lastRun);
    
    switch (interval) {
      case 'daily':
        return now.getDate() !== lastRunDate.getDate();
      case 'weekly':
        const weekDiff = Math.floor((now - lastRunDate) / (7 * 24 * 60 * 60 * 1000));
        return weekDiff >= 1;
      case 'monthly':
        return now.getMonth() !== lastRunDate.getMonth() || now.getFullYear() !== lastRunDate.getFullYear();
      default:
        return false;
    }
  }

  // Add message to appropriate queue based on channel
  async addMessageToQueue(channel, messageData, options = {}) {
    switch (channel) {
      case 'whatsapp':
        return await queueService.addWhatsAppJob(messageData, options);
      case 'email':
        return await queueService.addEmailJob(messageData, options);
      case 'sms':
        return await queueService.addSmsJob(messageData, options);
      case 'linkedin':
        return await queueService.addLinkedInJob(messageData, options);
      default:
        throw new Error(`Unsupported channel: ${channel}`);
    }
  }

  // Personalize message content with contact data
  async personalizeMessage(template, contact) {
    let content = template;
    
    // Replace placeholders with contact data
    const replacements = {
      '{{firstName}}': contact.firstName || 'there',
      '{{lastName}}': contact.lastName || '',
      '{{fullName}}': `${contact.firstName || ''} ${contact.lastName || ''}`.trim() || 'there',
      '{{company}}': contact.company || 'your company',
      '{{email}}': contact.email || '',
      '{{phone}}': contact.phone || '',
      '{{position}}': contact.position || '',
      '{{city}}': contact.city || '',
      '{{state}}': contact.state || '',
      '{{country}}': contact.country || 'India',
    };

    Object.entries(replacements).forEach(([placeholder, value]) => {
      content = content.replace(new RegExp(placeholder, 'g'), value);
    });

    return content;
  }

  // Pause campaign
  async pauseCampaign(campaignId) {
    try {
      const campaign = await Campaign.findByPk(campaignId);
      if (!campaign) {
        throw new Error(`Campaign ${campaignId} not found`);
      }

      await campaign.update({ status: 'paused' });
      logger.info(`Campaign ${campaignId} paused`);
      return true;
    } catch (error) {
      logger.error(`Failed to pause campaign ${campaignId}`, {
        error: error.message,
      });
      throw error;
    }
  }

  // Resume campaign
  async resumeCampaign(campaignId) {
    try {
      const campaign = await Campaign.findByPk(campaignId);
      if (!campaign) {
        throw new Error(`Campaign ${campaignId} not found`);
      }

      await campaign.update({ status: 'active' });
      logger.info(`Campaign ${campaignId} resumed`);
      return true;
    } catch (error) {
      logger.error(`Failed to resume campaign ${campaignId}`, {
        error: error.message,
      });
      throw error;
    }
  }

  // Stop campaign
  async stopCampaign(campaignId) {
    try {
      const campaign = await Campaign.findByPk(campaignId);
      if (!campaign) {
        throw new Error(`Campaign ${campaignId} not found`);
      }

      await campaign.update({ 
        status: 'stopped',
        completedAt: new Date(),
      });
      logger.info(`Campaign ${campaignId} stopped`);
      return true;
    } catch (error) {
      logger.error(`Failed to stop campaign ${campaignId}`, {
        error: error.message,
      });
      throw error;
    }
  }

  // Get campaign execution stats
  async getCampaignStats(campaignId) {
    try {
      const campaign = await Campaign.findByPk(campaignId);
      if (!campaign) {
        throw new Error(`Campaign ${campaignId} not found`);
      }

      const messages = await Message.findAll({
        where: { campaignId },
      });

      const stats = {
        total: messages.length,
        sent: messages.filter(m => m.status === 'sent').length,
        delivered: messages.filter(m => m.status === 'delivered').length,
        failed: messages.filter(m => m.status === 'failed').length,
        pending: messages.filter(m => m.status === 'pending').length,
      };

      return {
        campaign: {
          id: campaign.id,
          name: campaign.name,
          status: campaign.status,
          type: campaign.type,
          channel: campaign.channel,
          startedAt: campaign.startedAt,
          completedAt: campaign.completedAt,
        },
        stats,
      };
    } catch (error) {
      logger.error(`Failed to get campaign stats for ${campaignId}`, {
        error: error.message,
      });
      throw error;
    }
  }
}

module.exports = new CampaignExecutionService();