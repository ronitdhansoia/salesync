const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Consent = sequelize.define('Consent', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  contactId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Contacts',
      key: 'id',
    },
  },
  consentType: {
    type: DataTypes.ENUM('whatsapp', 'email', 'sms', 'linkedin', 'data_processing'),
    allowNull: false,
  },
  consentStatus: {
    type: DataTypes.ENUM('granted', 'withdrawn', 'pending', 'expired'),
    allowNull: false,
    defaultValue: 'pending',
  },
  purpose: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Specific purpose for which consent is being collected as per DPDPA 2023',
  },
  legalBasis: {
    type: DataTypes.ENUM('consent', 'legitimate_interest', 'contract', 'legal_obligation'),
    allowNull: false,
    defaultValue: 'consent',
  },
  consentText: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'The exact consent text presented to the data principal',
  },
  consentMethod: {
    type: DataTypes.ENUM('website_form', 'email_opt_in', 'whatsapp_opt_in', 'phone_call', 'sms_opt_in', 'manual_entry'),
    allowNull: false,
  },
  ipAddress: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'IP address from which consent was collected',
  },
  userAgent: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'User agent string for digital consent collection',
  },
  consentTimestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  withdrawalTimestamp: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: 'Date when consent expires and needs renewal',
  },
  reminderSent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Whether renewal reminder has been sent',
  },
  renewalCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Number of times consent has been renewed',
  },
  dataCategories: {
    type: DataTypes.JSON,
    allowNull: false,
    comment: 'Categories of personal data covered by this consent',
    defaultValue: [],
  },
  processingActivities: {
    type: DataTypes.JSON,
    allowNull: false,
    comment: 'Specific processing activities covered',
    defaultValue: [],
  },
  thirdPartySharing: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Whether data may be shared with third parties',
  },
  thirdPartyDetails: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Details of third parties if sharing is involved',
  },
  retentionPeriod: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'How long data will be retained',
    defaultValue: '2 years',
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  auditTrail: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Complete audit trail of consent changes',
  },
}, {
  tableName: 'consents',
  timestamps: true,
  indexes: [
    {
      fields: ['userId'],
    },
    {
      fields: ['contactId'],
    },
    {
      fields: ['consentType', 'consentStatus'],
    },
    {
      fields: ['expiryDate'],
    },
    {
      fields: ['consentTimestamp'],
    },
  ],
});

module.exports = Consent;