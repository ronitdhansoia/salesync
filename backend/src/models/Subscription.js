module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    plan: {
      type: DataTypes.ENUM('free', 'starter', 'growth', 'scale', 'enterprise'),
      defaultValue: 'free'
    },
    status: {
      type: DataTypes.ENUM('active', 'cancelled', 'expired', 'suspended'),
      defaultValue: 'active'
    },
    billingCycle: {
      type: DataTypes.ENUM('monthly', 'annual'),
      defaultValue: 'monthly'
    },
    currentPeriodStart: {
      type: DataTypes.DATE,
      allowNull: false
    },
    currentPeriodEnd: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cancelledAt: {
      type: DataTypes.DATE
    },
    cancellationReason: {
      type: DataTypes.STRING
    },
    limits: {
      type: DataTypes.JSONB,
      defaultValue: {
        contacts: 500,
        messagesPerMonth: 1000,
        campaignsPerMonth: 5,
        users: 1,
        whatsappEnabled: true,
        emailEnabled: true,
        smsEnabled: false,
        linkedinEnabled: false,
        apiAccess: false,
        customIntegrations: false,
        priority_support: false
      }
    },
    usage: {
      type: DataTypes.JSONB,
      defaultValue: {
        contacts: 0,
        messagesThisMonth: 0,
        campaignsThisMonth: 0
      }
    },
    razorpaySubscriptionId: {
      type: DataTypes.STRING
    },
    razorpayCustomerId: {
      type: DataTypes.STRING
    },
    pricePerMonth: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    discount: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0
    },
    nextBillingAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
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
        fields: ['plan']
      }
    ]
  });

  return Subscription;
};