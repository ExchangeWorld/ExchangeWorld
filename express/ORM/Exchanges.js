var Sequelize = require('sequelize');
var sequelize = require('../libs/orm');

// Define the schema of table `exchanges`
var Exchanges = sequelize.define('exchanges', {
	eid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	// Smaller goods_gid puts here
	goods1_gid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false
	},
	// Larger goods_gid puts here
	goods2_gid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false
	},
	// 'initiated', 'dropped', 'completed'
	status: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: 'initiated'
	}
});

module.exports = Exchanges;
