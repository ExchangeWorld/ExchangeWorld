var Sequelize = require('sequelize');
var sequelize = require('../libs/orm');

var Tokens = sequelize.define('tokens', {
	tid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	},
	user_uid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false
	},
	token: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Tokens;
