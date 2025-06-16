module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
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
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      defaultValue: 'INR'
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'succeeded', 'failed', 'refunded'),
      defaultValue: 'pending'
    },
    paymentMethod: {
      type: DataTypes.ENUM('card', 'upi', 'netbanking', 'wallet'),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    razorpayPaymentId: {
      type: DataTypes.STRING,
      unique: true
    },
    razorpayOrderId: {
      type: DataTypes.STRING
    },
    razorpaySignature: {
      type: DataTypes.STRING
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      unique: true
    },
    gstAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    metadata: {
      type: DataTypes.JSONB,
      defaultValue: {}
    },
    failureReason: {
      type: DataTypes.STRING
    },
    refundAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    refundedAt: {
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
        fields: ['razorpayPaymentId']
      },
      {
        fields: ['invoiceNumber']
      }
    ]
  });

  return Payment;
};