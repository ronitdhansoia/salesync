const { makeWASocket, DisconnectReason, useMultiFileAuthState, downloadMediaMessage } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const path = require('path');
const QRCode = require('qrcode');
const logger = require('../utils/logger');

class WhatsAppService {
  constructor() {
    this.sock = null;
    this.isConnected = false;
    this.qrCode = null;
    this.authDir = path.join(__dirname, '../../auth');
    this.mediaDir = path.join(__dirname, '../../media');
    this.connectionRetries = 0;
    this.maxRetries = 5;
    
    // Ensure directories exist
    if (!fs.existsSync(this.authDir)) {
      fs.mkdirSync(this.authDir, { recursive: true });
    }
    if (!fs.existsSync(this.mediaDir)) {
      fs.mkdirSync(this.mediaDir, { recursive: true });
    }
  }

  // Initialize WhatsApp connection
  async initialize() {
    try {
      logger.info('Initializing WhatsApp connection');

      const { state, saveCreds } = await useMultiFileAuthState(this.authDir);

      this.sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: {
          level: 'warn',
          log: (level, message) => {
            if (level === 'error') {
              logger.error('WhatsApp socket error', { message });
            }
          }
        },
        browser: ['SaleSync India', 'Chrome', '10.15.7'],
        defaultQueryTimeoutMs: 30000,
      });

      // Handle connection updates
      this.sock.ev.on('connection.update', async (update) => {
        await this.handleConnectionUpdate(update);
      });

      // Handle credentials update
      this.sock.ev.on('creds.update', saveCreds);

      // Handle incoming messages
      this.sock.ev.on('messages.upsert', async (messageUpdate) => {
        await this.handleIncomingMessages(messageUpdate);
      });

      // Handle message status updates
      this.sock.ev.on('message.update', async (messageUpdate) => {
        await this.handleMessageStatusUpdate(messageUpdate);
      });

      logger.info('WhatsApp service initialized');
    } catch (error) {
      logger.error('Failed to initialize WhatsApp service', {
        error: error.message,
      });
      throw error;
    }
  }

  // Handle connection status updates
  async handleConnectionUpdate(update) {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      // Generate QR code for authentication
      this.qrCode = await QRCode.toDataURL(qr);
      logger.info('QR Code generated for WhatsApp authentication');
    }

    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error instanceof Boom) 
        ? lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut
        : true;

      if (shouldReconnect && this.connectionRetries < this.maxRetries) {
        this.connectionRetries++;
        logger.info(`Reconnecting to WhatsApp... (attempt ${this.connectionRetries})`);
        await this.initialize();
      } else {
        logger.error('WhatsApp connection closed permanently');
        this.isConnected = false;
        this.qrCode = null;
      }
    } else if (connection === 'open') {
      logger.info('WhatsApp connection established');
      this.isConnected = true;
      this.qrCode = null;
      this.connectionRetries = 0;
    }
  }

  // Handle incoming messages (for auto-reply features)
  async handleIncomingMessages(messageUpdate) {
    const messages = messageUpdate.messages;
    
    for (const message of messages) {
      if (message.key.fromMe) continue; // Skip our own messages
      
      logger.info('Received WhatsApp message', {
        from: message.key.remoteJid,
        messageType: Object.keys(message.message || {})[0],
      });

      // Here you can implement auto-reply logic
      // await this.handleAutoReply(message);
    }
  }

  // Handle message status updates (delivery, read receipts)
  async handleMessageStatusUpdate(messageUpdate) {
    for (const message of messageUpdate) {
      if (message.update.status) {
        logger.info('Message status updated', {
          messageId: message.key.id,
          status: message.update.status,
        });

        // Update message status in database
        // await this.updateMessageStatus(message.key.id, message.update.status);
      }
    }
  }

  // Send text message
  async sendMessage(phoneNumber, content) {
    try {
      if (!this.isConnected) {
        throw new Error('WhatsApp not connected');
      }

      const jid = this.formatJid(phoneNumber);
      
      logger.info('Sending WhatsApp message', {
        to: phoneNumber,
        contentLength: content.length,
      });

      const result = await this.sock.sendMessage(jid, {
        text: content,
      });

      logger.info('WhatsApp message sent successfully', {
        messageId: result.key.id,
        to: phoneNumber,
      });

      return {
        success: true,
        messageId: result.key.id,
        timestamp: result.messageTimestamp,
      };

    } catch (error) {
      logger.error('Failed to send WhatsApp message', {
        to: phoneNumber,
        error: error.message,
      });

      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Send media message (image, video, document)
  async sendMediaMessage(phoneNumber, mediaUrl, mediaType, caption = '') {
    try {
      if (!this.isConnected) {
        throw new Error('WhatsApp not connected');
      }

      const jid = this.formatJid(phoneNumber);
      
      logger.info('Sending WhatsApp media message', {
        to: phoneNumber,
        mediaType,
        mediaUrl,
      });

      let messageContent = {};

      switch (mediaType) {
        case 'image':
          messageContent = {
            image: { url: mediaUrl },
            caption: caption,
          };
          break;
        case 'video':
          messageContent = {
            video: { url: mediaUrl },
            caption: caption,
          };
          break;
        case 'audio':
          messageContent = {
            audio: { url: mediaUrl },
            mimetype: 'audio/mp4',
          };
          break;
        case 'document':
          messageContent = {
            document: { url: mediaUrl },
            mimetype: 'application/pdf',
            fileName: caption || 'document.pdf',
          };
          break;
        default:
          throw new Error(`Unsupported media type: ${mediaType}`);
      }

      const result = await this.sock.sendMessage(jid, messageContent);

      logger.info('WhatsApp media message sent successfully', {
        messageId: result.key.id,
        to: phoneNumber,
        mediaType,
      });

      return {
        success: true,
        messageId: result.key.id,
        timestamp: result.messageTimestamp,
      };

    } catch (error) {
      logger.error('Failed to send WhatsApp media message', {
        to: phoneNumber,
        mediaType,
        error: error.message,
      });

      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Send template message (for WhatsApp Business API compliance)
  async sendTemplateMessage(phoneNumber, templateName, templateParams = []) {
    try {
      if (!this.isConnected) {
        throw new Error('WhatsApp not connected');
      }

      const jid = this.formatJid(phoneNumber);
      
      logger.info('Sending WhatsApp template message', {
        to: phoneNumber,
        template: templateName,
      });

      // For Baileys, we'll send as regular text with template formatting
      // In production, you'd use WhatsApp Business API for real templates
      const templateContent = this.formatTemplate(templateName, templateParams);

      const result = await this.sock.sendMessage(jid, {
        text: templateContent,
      });

      return {
        success: true,
        messageId: result.key.id,
        timestamp: result.messageTimestamp,
      };

    } catch (error) {
      logger.error('Failed to send WhatsApp template message', {
        to: phoneNumber,
        template: templateName,
        error: error.message,
      });

      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Send bulk messages with rate limiting
  async sendBulkMessages(messages) {
    const results = [];
    
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      
      try {
        const result = await this.sendMessage(message.phoneNumber, message.content);
        results.push({
          ...result,
          phoneNumber: message.phoneNumber,
          index: i,
        });

        // Rate limiting: wait 2 seconds between messages
        if (i < messages.length - 1) {
          await this.delay(2000);
        }

      } catch (error) {
        results.push({
          success: false,
          error: error.message,
          phoneNumber: message.phoneNumber,
          index: i,
        });
      }
    }

    return results;
  }

  // Check if phone number exists on WhatsApp
  async checkPhoneNumber(phoneNumber) {
    try {
      if (!this.isConnected) {
        throw new Error('WhatsApp not connected');
      }

      const jid = this.formatJid(phoneNumber);
      const [result] = await this.sock.onWhatsApp(jid);
      
      return {
        exists: !!result?.exists,
        jid: result?.jid,
      };

    } catch (error) {
      logger.error('Failed to check phone number', {
        phoneNumber,
        error: error.message,
      });

      return {
        exists: false,
        error: error.message,
      };
    }
  }

  // Format phone number to WhatsApp JID format
  formatJid(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    return `${cleaned}@s.whatsapp.net`;
  }

  // Format template message content
  formatTemplate(templateName, params) {
    // Template definitions (in production, these would come from WhatsApp Business API)
    const templates = {
      welcome: `Hello {{1}}! Welcome to SaleSync India. We're excited to help you automate your sales process.`,
      follow_up: `Hi {{1}}, following up on our previous conversation about {{2}}. Are you available for a quick call?`,
      demo_invite: `Hi {{1}}! Would you like to see a personalized demo of SaleSync India for {{2}}? We can show you how to increase your sales by 3x.`,
    };

    let content = templates[templateName] || templateName;
    
    // Replace placeholders
    params.forEach((param, index) => {
      content = content.replace(`{{${index + 1}}}`, param);
    });

    return content;
  }

  // Get connection status
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      hasQrCode: !!this.qrCode,
      qrCode: this.qrCode,
      retries: this.connectionRetries,
    };
  }

  // Get QR code for authentication
  getQrCode() {
    return this.qrCode;
  }

  // Disconnect WhatsApp
  async disconnect() {
    try {
      if (this.sock) {
        await this.sock.logout();
        this.sock = null;
      }
      this.isConnected = false;
      this.qrCode = null;
      logger.info('WhatsApp disconnected successfully');
    } catch (error) {
      logger.error('Failed to disconnect WhatsApp', {
        error: error.message,
      });
    }
  }

  // Utility function for delays
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Download media from message
  async downloadMedia(message) {
    try {
      const buffer = await downloadMediaMessage(
        message,
        'buffer',
        {},
        {
          logger: {
            info: () => {},
            error: (msg) => logger.error('Media download error', { msg }),
            warn: () => {},
          }
        }
      );

      const filename = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const filepath = path.join(this.mediaDir, filename);
      
      fs.writeFileSync(filepath, buffer);
      
      return {
        success: true,
        filepath,
        filename,
        size: buffer.length,
      };

    } catch (error) {
      logger.error('Failed to download media', {
        error: error.message,
      });

      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = new WhatsAppService();