module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    campaignId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Campaigns',
        key: 'id'
      }
    },
    contactId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Contacts',
        key: 'id'
      }
    },
    channel: {
      type: DataTypes.ENUM('whatsapp', 'email', 'sms', 'linkedin'),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('initial', 'follow-up', 'reply', 'system'),
      defaultValue: 'initial'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    mediaUrl: {
      type: DataTypes.STRING
    },
    mediaType: {
      type: DataTypes.ENUM('image', 'video', 'document', 'audio')
    },
    status: {
      type: DataTypes.ENUM('pending', 'sent', 'delivered', 'read', 'failed', 'bounced'),
      defaultValue: 'pending'
    },
    direction: {
      type: DataTypes.ENUM('outbound', 'inbound'),
      defaultValue: 'outbound'
    },
    scheduledFor: {
      type: DataTypes.DATE
    },
    sentAt: {
      type: DataTypes.DATE
    },
    deliveredAt: {
      type: DataTypes.DATE
    },
    readAt: {
      type: DataTypes.DATE
    },
    failedAt: {
      type: DataTypes.DATE
    },
    failureReason: {
      type: DataTypes.STRING
    },
    cost: {
      type: DataTypes.DECIMAL(10, 4),
      defaultValue: 0
    },
    messageId: {
      type: DataTypes.STRING
    },
    metadata: {
      type: DataTypes.JSONB,
      defaultValue: {}
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['campaignId']
      },
      {
        fields: ['contactId']
      },
      {
        fields: ['status']
      },
      {
        fields: ['scheduledFor']
      },
      {
        fields: ['channel']
      }
    ]
  });

  return Message;
};