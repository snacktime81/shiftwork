const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Time = require('./time');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Time = Time;


User.init(sequelize);
Time.init(sequelize);


User.associate(db);
Time.associate(db);

module.exports = db;