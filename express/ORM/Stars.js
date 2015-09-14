var Sequelize = require('sequelize');
var sequelize = require('../libs/orm');

// Define the schema of table `stars`
var Stars = sequelize.define('stars', {
	sid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	},
	goods_gid: {
		type: Sequelize.INTEGER.UNSIGNED, // which goods is starred
		allowNull: false
	},
	starring_user_uid: {
		type: Sequelize.INTEGER.UNSIGNED, // who stars the goods
		allowNull: false
	}
}, {
	// prevent sequelize auto-append 's' after tablename
	freezeTableName: true
});

module.exports = Stars;
