const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, {
      ...config,
      logging: config.logging || false,
      pool: config.pool || {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./User')(sequelize, Sequelize);
db.Contact = require('./Contact')(sequelize, Sequelize);
db.Campaign = require('./Campaign')(sequelize, Sequelize);
db.Message = require('./Message')(sequelize, Sequelize);
db.Template = require('./Template')(sequelize, Sequelize);
db.Analytics = require('./Analytics')(sequelize, Sequelize);
db.Subscription = require('./Subscription')(sequelize, Sequelize);
db.Payment = require('./Payment')(sequelize, Sequelize);

// Define associations
db.User.hasMany(db.Contact, { foreignKey: 'userId' });
db.Contact.belongsTo(db.User, { foreignKey: 'userId' });

db.User.hasMany(db.Campaign, { foreignKey: 'userId' });
db.Campaign.belongsTo(db.User, { foreignKey: 'userId' });

db.Campaign.hasMany(db.Message, { foreignKey: 'campaignId' });
db.Message.belongsTo(db.Campaign, { foreignKey: 'campaignId' });

db.Contact.hasMany(db.Message, { foreignKey: 'contactId' });
db.Message.belongsTo(db.Contact, { foreignKey: 'contactId' });

db.User.hasMany(db.Template, { foreignKey: 'userId' });
db.Template.belongsTo(db.User, { foreignKey: 'userId' });

db.Campaign.hasMany(db.Analytics, { foreignKey: 'campaignId' });
db.Analytics.belongsTo(db.Campaign, { foreignKey: 'campaignId' });

db.User.hasOne(db.Subscription, { foreignKey: 'userId' });
db.Subscription.belongsTo(db.User, { foreignKey: 'userId' });

db.User.hasMany(db.Payment, { foreignKey: 'userId' });
db.Payment.belongsTo(db.User, { foreignKey: 'userId' });

module.exports = db;