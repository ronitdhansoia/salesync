const Queue = require('bull');
const redis = require('redis');
const logger = require('../utils/logger');

// Redis configuration
const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || null,
  db: process.env.REDIS_DB || 0,
  retryDelayOnFailover: 100,
  enableReadyCheck: false,
  maxRetriesPerRequest: null,
};

// Create Redis client
const redisClient = redis.createClient(redisConfig);

// Queue configurations
const queueConfig = {
  redis: redisConfig,
  settings: {
    stalledInterval: 30 * 1000,
    maxStalledCount: 1,
  },
  defaultJobOptions: {
    removeOnComplete: 100,
    removeOnFail: 50,
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
  },
};

// Initialize queues for different channels
const queues = {
  whatsapp: new Queue('whatsapp-messages', queueConfig),
  email: new Queue('email-messages', queueConfig),
  sms: new Queue('sms-messages', queueConfig),
  linkedin: new Queue('linkedin-actions', queueConfig),
  campaign: new Queue('campaign-execution', queueConfig),
  analytics: new Queue('analytics-processing', queueConfig),
};

// Queue event handlers
Object.keys(queues).forEach(queueName => {
  const queue = queues[queueName];
  
  queue.on('completed', (job, result) => {
    logger.info(`Job completed in ${queueName} queue`, {
      jobId: job.id,
      result: result,
      processingTime: Date.now() - job.timestamp,
    });
  });
  
  queue.on('failed', (job, err) => {
    logger.error(`Job failed in ${queueName} queue`, {
      jobId: job.id,
      error: err.message,
      attempts: job.attemptsMade,
    });
  });
  
  queue.on('stalled', (job) => {
    logger.warn(`Job stalled in ${queueName} queue`, {
      jobId: job.id,
      attempts: job.attemptsMade,
    });
  });
});

class QueueService {
  constructor() {
    this.queues = queues;
    this.redisClient = redisClient;
  }

  // Add job to specific queue
  async addJob(queueName, jobType, data, options = {}) {
    try {
      if (!this.queues[queueName]) {
        throw new Error(`Queue ${queueName} not found`);
      }

      const job = await this.queues[queueName].add(jobType, data, {
        ...queueConfig.defaultJobOptions,
        ...options,
      });

      logger.info(`Job added to ${queueName} queue`, {
        jobId: job.id,
        jobType,
        data: data,
      });

      return job;
    } catch (error) {
      logger.error('Failed to add job to queue', {
        queueName,
        jobType,
        error: error.message,
      });
      throw error;
    }
  }

  // Add WhatsApp message job
  async addWhatsAppJob(data, options = {}) {
    return this.addJob('whatsapp', 'send-message', data, {
      delay: options.delay || 0,
      priority: options.priority || 0,
      ...options,
    });
  }

  // Add Email job
  async addEmailJob(data, options = {}) {
    return this.addJob('email', 'send-email', data, {
      delay: options.delay || 0,
      priority: options.priority || 0,
      ...options,
    });
  }

  // Add SMS job
  async addSmsJob(data, options = {}) {
    return this.addJob('sms', 'send-sms', data, {
      delay: options.delay || 0,
      priority: options.priority || 0,
      ...options,
    });
  }

  // Add LinkedIn job
  async addLinkedInJob(data, options = {}) {
    return this.addJob('linkedin', 'linkedin-action', data, {
      delay: options.delay || 0,
      priority: options.priority || 0,
      ...options,
    });
  }

  // Add Campaign execution job
  async addCampaignJob(data, options = {}) {
    return this.addJob('campaign', 'execute-campaign', data, {
      delay: options.delay || 0,
      priority: options.priority || 0,
      ...options,
    });
  }

  // Get queue statistics
  async getQueueStats(queueName) {
    try {
      const queue = this.queues[queueName];
      if (!queue) {
        throw new Error(`Queue ${queueName} not found`);
      }

      const [waiting, active, completed, failed, delayed] = await Promise.all([
        queue.getWaiting(),
        queue.getActive(),
        queue.getCompleted(),
        queue.getFailed(),
        queue.getDelayed(),
      ]);

      return {
        waiting: waiting.length,
        active: active.length,
        completed: completed.length,
        failed: failed.length,
        delayed: delayed.length,
        total: waiting.length + active.length + completed.length + failed.length + delayed.length,
      };
    } catch (error) {
      logger.error('Failed to get queue stats', {
        queueName,
        error: error.message,
      });
      throw error;
    }
  }

  // Get all queue statistics
  async getAllQueueStats() {
    const stats = {};
    for (const queueName of Object.keys(this.queues)) {
      stats[queueName] = await this.getQueueStats(queueName);
    }
    return stats;
  }

  // Pause queue
  async pauseQueue(queueName) {
    try {
      const queue = this.queues[queueName];
      if (!queue) {
        throw new Error(`Queue ${queueName} not found`);
      }

      await queue.pause();
      logger.info(`Queue ${queueName} paused`);
      return true;
    } catch (error) {
      logger.error('Failed to pause queue', {
        queueName,
        error: error.message,
      });
      throw error;
    }
  }

  // Resume queue
  async resumeQueue(queueName) {
    try {
      const queue = this.queues[queueName];
      if (!queue) {
        throw new Error(`Queue ${queueName} not found`);
      }

      await queue.resume();
      logger.info(`Queue ${queueName} resumed`);
      return true;
    } catch (error) {
      logger.error('Failed to resume queue', {
        queueName,
        error: error.message,
      });
      throw error;
    }
  }

  // Clean completed jobs
  async cleanQueue(queueName, jobType = 'completed', age = 24 * 60 * 60 * 1000) {
    try {
      const queue = this.queues[queueName];
      if (!queue) {
        throw new Error(`Queue ${queueName} not found`);
      }

      const cleaned = await queue.clean(age, jobType);
      logger.info(`Cleaned ${cleaned.length} ${jobType} jobs from ${queueName} queue`);
      return cleaned.length;
    } catch (error) {
      logger.error('Failed to clean queue', {
        queueName,
        jobType,
        error: error.message,
      });
      throw error;
    }
  }

  // Get job by ID
  async getJob(queueName, jobId) {
    try {
      const queue = this.queues[queueName];
      if (!queue) {
        throw new Error(`Queue ${queueName} not found`);
      }

      return await queue.getJob(jobId);
    } catch (error) {
      logger.error('Failed to get job', {
        queueName,
        jobId,
        error: error.message,
      });
      throw error;
    }
  }

  // Retry failed job
  async retryJob(queueName, jobId) {
    try {
      const job = await this.getJob(queueName, jobId);
      if (!job) {
        throw new Error(`Job ${jobId} not found in queue ${queueName}`);
      }

      await job.retry();
      logger.info(`Job ${jobId} retried in queue ${queueName}`);
      return true;
    } catch (error) {
      logger.error('Failed to retry job', {
        queueName,
        jobId,
        error: error.message,
      });
      throw error;
    }
  }

  // Close all connections
  async close() {
    try {
      await Promise.all([
        ...Object.values(this.queues).map(queue => queue.close()),
        this.redisClient.quit(),
      ]);
      logger.info('All queue connections closed');
    } catch (error) {
      logger.error('Failed to close queue connections', {
        error: error.message,
      });
      throw error;
    }
  }
}

module.exports = new QueueService();