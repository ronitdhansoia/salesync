module.exports = (sequelize, DataTypes) => {
  const Analytics = sequelize.define('Analytics', {
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
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    metrics: {
      type: DataTypes.JSONB,
      defaultValue: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        replied: 0,
        converted: 0,
        failed: 0,
        bounced: 0,
        unsubscribed: 0,
        cost: 0
      }
    },
    channelBreakdown: {
      type: DataTypes.JSONB,
      defaultValue: {
        whatsapp: { sent: 0, delivered: 0, opened: 0, replied: 0 },
        email: { sent: 0, delivered: 0, opened: 0, clicked: 0 },
        sms: { sent: 0, delivered: 0, failed: 0 },
        linkedin: { sent: 0, delivered: 0, opened: 0, replied: 0 }
      }
    },
    hourlyBreakdown: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    topPerformingMessages: {
      type: DataTypes.JSONB,
      defaultValue: []
    },
    conversionFunnel: {
      type: DataTypes.JSONB,
      defaultValue: {
        reached: 0,
        engaged: 0,
        interested: 0,
        converted: 0
      }
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['campaignId']
      },
      {
        fields: ['date']
      },
      {
        unique: true,
        fields: ['campaignId', 'date']
      }
    ]
  });

  return Analytics;
};