module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        is: /^(\+91)?[6-9]\d{9}$/
      }
    },
    whatsappNumber: {
      type: DataTypes.STRING,
      validate: {
        is: /^(\+91)?[6-9]\d{9}$/
      }
    },
    linkedinUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    companyName: {
      type: DataTypes.STRING
    },
    designation: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    leadScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100
      }
    },
    status: {
      type: DataTypes.ENUM('new', 'contacted', 'qualified', 'converted', 'lost'),
      defaultValue: 'new'
    },
    source: {
      type: DataTypes.ENUM('manual', 'import', 'linkedin', 'api', 'website'),
      defaultValue: 'manual'
    },
    preferredChannel: {
      type: DataTypes.ENUM('whatsapp', 'email', 'sms', 'linkedin'),
      defaultValue: 'whatsapp'
    },
    language: {
      type: DataTypes.ENUM('en', 'hi', 'ta', 'te', 'mr'),
      defaultValue: 'en'
    },
    customFields: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    lastContactedAt: {
      type: DataTypes.DATE
    },
    unsubscribed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    unsubscribedAt: {
      type: DataTypes.DATE
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['userId']
      },
      {
        fields: ['email']
      },
      {
        fields: ['phoneNumber']
      },
      {
        fields: ['status']
      },
      {
        fields: ['tags'],
        using: 'GIN'
      }
    ]
  });

  return Contact;
};