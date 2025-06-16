const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const DataRequest = sequelize.define('DataRequest', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  contactId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Contacts',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id',
    },
    comment: 'User handling the request, if applicable',
  },
  requestType: {
    type: DataTypes.ENUM('access', 'rectification', 'erasure', 'portability', 'restriction', 'objection'),
    allowNull: false,
    comment: 'Type of data principal right being exercised under DPDPA 2023',
  },
  requestStatus: {
    type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'rejected', 'partially_completed'),
    allowNull: false,
    defaultValue: 'pending',
  },
  requestDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Detailed description of the data request',
  },
  requestSource: {
    type: DataTypes.ENUM('email', 'phone', 'whatsapp', 'website_form', 'postal_mail', 'in_person'),
    allowNull: false,
  },
  verificationStatus: {
    type: DataTypes.ENUM('pending', 'verified', 'failed'),
    allowNull: false,
    defaultValue: 'pending',
    comment: 'Identity verification status of the data principal',
  },
  verificationMethod: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Method used to verify identity',
  },
  verificationDetails: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Details of verification process',
  },
  requestedDataCategories: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
    comment: 'Specific categories of data requested',
  },
  responseData: {
    type: DataTypes.JSON,
    allowNull: true,
    comment: 'Data provided in response to access request',
  },
  responseFormat: {
    type: DataTypes.ENUM('json', 'csv', 'pdf', 'xml'),
    allowNull: true,
    defaultValue: 'json',
  },
  deliveryMethod: {
    type: DataTypes.ENUM('email', 'secure_download', 'postal_mail', 'in_person'),
    allowNull: true,
    defaultValue: 'email',
  },
  reasonForRejection: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Reason if request is rejected',
  },
  legalBasisForRejection: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Legal basis under DPDPA 2023 for rejection',
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Due date for response (within 30 days as per DPDPA 2023)',
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  extensionGranted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Whether extension was granted for complex requests',
  },
  extensionReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  extendedDueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  communicationLog: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Log of all communications regarding this request',
  },
  actionsPerformed: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Actions taken to fulfill the request',
  },
  impactAssessment: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Assessment of impact on business operations',
  },
  isUrgent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Whether request requires urgent handling',
  },
  escalated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    comment: 'Whether request has been escalated to management',
  },
  escalationReason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  costs: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    comment: 'Costs associated with fulfilling request (if applicable)',
  },
  attachments: {
    type: DataTypes.JSON,
    defaultValue: [],
    comment: 'Supporting documents and attachments',
  },
}, {
  tableName: 'data_requests',
  timestamps: true,
  indexes: [
    {
      fields: ['contactId'],
    },
    {
      fields: ['requestType'],
    },
    {
      fields: ['requestStatus'],
    },
    {
      fields: ['dueDate'],
    },
    {
      fields: ['verificationStatus'],
    },
    {
      fields: ['createdAt'],
    },
  ],
});

module.exports = DataRequest;