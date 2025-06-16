module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyName: {
      type: DataTypes.STRING
    },
    phoneNumber: {
      type: DataTypes.STRING,
      validate: {
        is: /^(\+91)?[6-9]\d{9}$/
      }
    },
    preferredLanguage: {
      type: DataTypes.ENUM('en', 'hi', 'ta', 'te', 'mr'),
      defaultValue: 'en'
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      defaultValue: 'user'
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    phoneVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    gstNumber: {
      type: DataTypes.STRING,
      validate: {
        is: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
      }
    },
    timezone: {
      type: DataTypes.STRING,
      defaultValue: 'Asia/Kolkata'
    },
    lastLoginAt: {
      type: DataTypes.DATE
    },
    metadata: {
      type: DataTypes.JSONB,
      defaultValue: {}
    }
  }, {
    timestamps: true,
    indexes: [
      {
        fields: ['email']
      },
      {
        fields: ['phoneNumber']
      }
    ]
  });

  return User;
};