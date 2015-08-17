var Sequelize = require('sequelize');
var sequelize = require('../libs/orm');

// Define the schema of table `messages`

var Messages = sequelize.define('messages', {});

module.exports = Messages;
