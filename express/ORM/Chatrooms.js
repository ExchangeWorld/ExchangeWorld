var Sequelize = require('sequelize');
var sequelize = require('../libs/orm');

// Define the schema of table `chatrooms`
var Chatrooms = sequelize.define('chatrooms', {
	cid: {
		type: Sequelize.INTEGER,
		allowNull: false,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	},
	members: {
		type: Sequelize.STRING,
		allowNull: true
	}
});

module.exports = Chatrooms;
