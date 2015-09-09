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
	// Set agree or not for goods1
	goods1_agree: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	// Set agree or not for goods2
	goods2_agree: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	},
	// 'initiated', 'dropped', 'completed'
	status: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: 'initiated'
	}
});

module.exports = Exchanges;
