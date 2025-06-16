module.exports = (sequelize, DataTypes) => {
  const Campaign = sequelize.define('Campaign', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.ENUM('whatsapp', 'email', 'sms', 'linkedin', 'multi-channel'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('draft', 'scheduled', 'active', 'paused', 'completed', 'cancelled'),
      defaultValue: 'draft'
    },
    targetAudience: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    schedule: {
      type: DataTypes.JSONB,
      defaultValue: {
        startDate: null,
        endDate: null,
        timezone: 'Asia/Kolkata',
        dailyStartTime: '09:00',
        dailyEndTime: '18:00',
        workingDays: ['mon', 'tue', 'wed', 'thu', 'fri'],
        messagesPerDay: 100
      }
    },
    messages: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    settings: {
      type: DataTypes.JSONB,
      defaultValue: {
        stopOnReply: true,
        followUpDelay: 2,
        maxFollowUps: 3,
        trackOpens: true,
        trackClicks: true,
        personalization: true
      }
    },
    stats: {
      type: DataTypes.JSONB,
      defaultValue: {
        totalContacts: 0,
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        replied: 0,
        converted: 0,
        failed: 0
      }
    },
    budget: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    spentAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    startedAt: {
      type: DataTypes.DATE
    },
    completedAt: {
      type: DataTypes.DATE
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['status']
      },
      {
        fields: ['type']
      }
    ]
  });

  return Campaign;
};