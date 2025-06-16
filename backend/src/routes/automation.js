const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const queueService = require('../services/queueService');
const campaignExecutionService = require('../services/campaignExecutionService');
const whatsappService = require('../services/whatsappService');
const whatsappWorker = require('../workers/whatsappWorker');
const logger = require('../utils/logger');

// Get automation dashboard stats
router.get('/stats', auth, async (req, res) => {
  try {
    // Get queue statistics
    const queueStats = await queueService.getAllQueueStats();
    
    // Get worker statistics
    const workerStats = {
      whatsapp: whatsappWorker.getStats(),
    };

    // Get connection status
    const connectionStatus = {
      whatsapp: whatsappService.getConnectionStatus(),
    };

    res.json({
      success: true,
      data: {
        queues: queueStats,
        workers: workerStats,
        connections: connectionStatus,
      },
    });
  } catch (error) {
    logger.error('Failed to get automation stats', {
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to get automation statistics',
    });
  }
});

// Get queue statistics for specific queue
router.get('/queues/:queueName/stats', auth, async (req, res) => {
  try {
    const { queueName } = req.params;
    const stats = await queueService.getQueueStats(queueName);
    
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    logger.error('Failed to get queue stats', {
      queueName: req.params.queueName,
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to get queue statistics',
    });
  }
});

// Pause a queue
router.post('/queues/:queueName/pause', auth, async (req, res) => {
  try {
    const { queueName } = req.params;
    await queueService.pauseQueue(queueName);
    
    logger.info(`Queue ${queueName} paused by user`, {
      userId: req.user.id,
    });
    
    res.json({
      success: true,
      message: `Queue ${queueName} paused successfully`,
    });
  } catch (error) {
    logger.error('Failed to pause queue', {
      queueName: req.params.queueName,
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to pause queue',
    });
  }
});

// Resume a queue
router.post('/queues/:queueName/resume', auth, async (req, res) => {
  try {
    const { queueName } = req.params;
    await queueService.resumeQueue(queueName);
    
    logger.info(`Queue ${queueName} resumed by user`, {
      userId: req.user.id,
    });
    
    res.json({
      success: true,
      message: `Queue ${queueName} resumed successfully`,
    });
  } catch (error) {
    logger.error('Failed to resume queue', {
      queueName: req.params.queueName,
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to resume queue',
    });
  }
});

// Clean a queue
router.post('/queues/:queueName/clean', auth, async (req, res) => {
  try {
    const { queueName } = req.params;
    const { jobType = 'completed', age = 24 * 60 * 60 * 1000 } = req.body;
    
    const cleanedCount = await queueService.cleanQueue(queueName, jobType, age);
    
    logger.info(`Queue ${queueName} cleaned`, {
      queueName,
      jobType,
      cleanedCount,
      userId: req.user.id,
    });
    
    res.json({
      success: true,
      message: `Cleaned ${cleanedCount} ${jobType} jobs from ${queueName} queue`,
      data: { cleanedCount },
    });
  } catch (error) {
    logger.error('Failed to clean queue', {
      queueName: req.params.queueName,
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to clean queue',
    });
  }
});

// Get job details
router.get('/queues/:queueName/jobs/:jobId', auth, async (req, res) => {
  try {
    const { queueName, jobId } = req.params;
    const job = await queueService.getJob(queueName, jobId);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }
    
    res.json({
      success: true,
      data: {
        id: job.id,
        name: job.name,
        data: job.data,
        opts: job.opts,
        progress: job.progress,
        delay: job.delay,
        timestamp: job.timestamp,
        attemptsMade: job.attemptsMade,
        failedReason: job.failedReason,
        stacktrace: job.stacktrace,
        returnvalue: job.returnvalue,
        finishedOn: job.finishedOn,
        processedOn: job.processedOn,
      },
    });
  } catch (error) {
    logger.error('Failed to get job details', {
      queueName: req.params.queueName,
      jobId: req.params.jobId,
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to get job details',
    });
  }
});

// Retry a failed job
router.post('/queues/:queueName/jobs/:jobId/retry', auth, async (req, res) => {
  try {
    const { queueName, jobId } = req.params;
    await queueService.retryJob(queueName, jobId);
    
    logger.info(`Job ${jobId} retried`, {
      queueName,
      jobId,
      userId: req.user.id,
    });
    
    res.json({
      success: true,
      message: 'Job retried successfully',
    });
  } catch (error) {
    logger.error('Failed to retry job', {
      queueName: req.params.queueName,
      jobId: req.params.jobId,
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to retry job',
    });
  }
});

// WhatsApp specific routes

// Get WhatsApp connection status
router.get('/whatsapp/status', auth, async (req, res) => {
  try {
    const status = whatsappService.getConnectionStatus();
    res.json({
      success: true,
      data: status,
    });
  } catch (error) {
    logger.error('Failed to get WhatsApp status', {
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to get WhatsApp status',
    });
  }
});

// Initialize WhatsApp connection
router.post('/whatsapp/connect', auth, async (req, res) => {
  try {
    await whatsappService.initialize();
    
    logger.info('WhatsApp connection initialized', {
      userId: req.user.id,
    });
    
    res.json({
      success: true,
      message: 'WhatsApp connection initialized',
    });
  } catch (error) {
    logger.error('Failed to initialize WhatsApp connection', {
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to initialize WhatsApp connection',
    });
  }
});

// Disconnect WhatsApp
router.post('/whatsapp/disconnect', auth, async (req, res) => {
  try {
    await whatsappService.disconnect();
    
    logger.info('WhatsApp disconnected', {
      userId: req.user.id,
    });
    
    res.json({
      success: true,
      message: 'WhatsApp disconnected successfully',
    });
  } catch (error) {
    logger.error('Failed to disconnect WhatsApp', {
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to disconnect WhatsApp',
    });
  }
});

// Get WhatsApp QR code
router.get('/whatsapp/qr', auth, async (req, res) => {
  try {
    const qrCode = whatsappService.getQrCode();
    
    if (!qrCode) {
      return res.status(404).json({
        success: false,
        message: 'QR code not available',
      });
    }
    
    res.json({
      success: true,
      data: { qrCode },
    });
  } catch (error) {
    logger.error('Failed to get WhatsApp QR code', {
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to get QR code',
    });
  }
});

// Send test WhatsApp message
router.post('/whatsapp/test', auth, async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;
    
    if (!phoneNumber || !message) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and message are required',
      });
    }
    
    const result = await whatsappService.sendMessage(phoneNumber, message);
    
    logger.info('Test WhatsApp message sent', {
      phoneNumber,
      result,
      userId: req.user.id,
    });
    
    res.json({
      success: true,
      message: 'Test message sent',
      data: result,
    });
  } catch (error) {
    logger.error('Failed to send test WhatsApp message', {
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to send test message',
    });
  }
});

// Check WhatsApp phone number
router.post('/whatsapp/check-number', auth, async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required',
      });
    }
    
    const result = await whatsappService.checkPhoneNumber(phoneNumber);
    
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error('Failed to check WhatsApp phone number', {
      phoneNumber: req.body.phoneNumber,
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to check phone number',
    });
  }
});

// Campaign execution routes

// Start campaign execution service
router.post('/campaigns/start-service', auth, async (req, res) => {
  try {
    campaignExecutionService.start();
    
    logger.info('Campaign execution service started', {
      userId: req.user.id,
    });
    
    res.json({
      success: true,
      message: 'Campaign execution service started',
    });
  } catch (error) {
    logger.error('Failed to start campaign execution service', {
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to start campaign execution service',
    });
  }
});

// Stop campaign execution service
router.post('/campaigns/stop-service', auth, async (req, res) => {
  try {
    campaignExecutionService.stop();
    
    logger.info('Campaign execution service stopped', {
      userId: req.user.id,
    });
    
    res.json({
      success: true,
      message: 'Campaign execution service stopped',
    });
  } catch (error) {
    logger.error('Failed to stop campaign execution service', {
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to stop campaign execution service',
    });
  }
});

// Pause campaign
router.post('/campaigns/:campaignId/pause', auth, async (req, res) => {
  try {
    const { campaignId } = req.params;
    await campaignExecutionService.pauseCampaign(campaignId);
    
    logger.info(`Campaign ${campaignId} paused`, {
      campaignId,
      userId: req.user.id,
    });
    
    res.json({
      success: true,
      message: 'Campaign paused successfully',
    });
  } catch (error) {
    logger.error('Failed to pause campaign', {
      campaignId: req.params.campaignId,
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to pause campaign',
    });
  }
});

// Resume campaign
router.post('/campaigns/:campaignId/resume', auth, async (req, res) => {
  try {
    const { campaignId } = req.params;
    await campaignExecutionService.resumeCampaign(campaignId);
    
    logger.info(`Campaign ${campaignId} resumed`, {
      campaignId,
      userId: req.user.id,
    });
    
    res.json({
      success: true,
      message: 'Campaign resumed successfully',
    });
  } catch (error) {
    logger.error('Failed to resume campaign', {
      campaignId: req.params.campaignId,
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to resume campaign',
    });
  }
});

// Stop campaign
router.post('/campaigns/:campaignId/stop', auth, async (req, res) => {
  try {
    const { campaignId } = req.params;
    await campaignExecutionService.stopCampaign(campaignId);
    
    logger.info(`Campaign ${campaignId} stopped`, {
      campaignId,
      userId: req.user.id,
    });
    
    res.json({
      success: true,
      message: 'Campaign stopped successfully',
    });
  } catch (error) {
    logger.error('Failed to stop campaign', {
      campaignId: req.params.campaignId,
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to stop campaign',
    });
  }
});

// Get campaign execution stats
router.get('/campaigns/:campaignId/stats', auth, async (req, res) => {
  try {
    const { campaignId } = req.params;
    const stats = await campaignExecutionService.getCampaignStats(campaignId);
    
    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    logger.error('Failed to get campaign stats', {
      campaignId: req.params.campaignId,
      error: error.message,
      userId: req.user.id,
    });
    res.status(500).json({
      success: false,
      message: 'Failed to get campaign statistics',
    });
  }
});

module.exports = router;