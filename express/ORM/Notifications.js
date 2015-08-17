var Sequelize = require('sequelize');
var sequelize = require('../libs/orm');

// Define the schema of table `notifications`

var Notifications = sequelize.define('notifications', {});

module.exports = Notifications;
