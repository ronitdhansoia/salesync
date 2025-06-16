module.exports = (sequelize, DataTypes) => {
  const Template = sequelize.define('Template', {
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
    category: {
      type: DataTypes.ENUM('marketing', 'transactional', 'follow-up', 'welcome', 'custom'),
      defaultValue: 'custom'
    },
    channel: {
      type: DataTypes.ENUM('whatsapp', 'email', 'sms', 'linkedin'),
      allowNull: false
    },
    language: {
      type: DataTypes.ENUM('en', 'hi', 'ta', 'te', 'mr'),
      defaultValue: 'en'
    },
    subject: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    variables: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    mediaUrl: {
      type: DataTypes.STRING
    },
    mediaType: {
      type: DataTypes.ENUM('image', 'video', 'document', 'audio')
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    approvalStatus: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending'
    },
    whatsappTemplateId: {
      type: DataTypes.STRING
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    usageCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    performance: {
      type: DataTypes.JSONB,
      defaultValue: {
        sent: 0,
        delivered: 0,
        opened: 0,
        clicked: 0,
        replied: 0
      }
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['channel']
      },
      {
        fields: ['language']
      },
      {
        fields: ['tags'],
        using: 'GIN'
      }
    ]
  });

  return Template;
};