var Sequelize = require('sequelize');
var sequelize = require('../libs/orm');

// Define the schema of table `tokens`
var Tokens = sequelize.define('tokens', {
	tid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	},
	token: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Tokens;
