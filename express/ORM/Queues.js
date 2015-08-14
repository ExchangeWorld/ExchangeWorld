var Sequelize = require('sequelize');
var sequelize = require('../libs/orm');

// Define the schema of table `queues`
var Queues = sequelize.define('queues', {
	qid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	},
	host_goods_gid: {
		type: Sequelize.INTEGER.UNSIGNED, // which goods has a queue
		allowNull: false
	},
	queuer_goods_gid: {
		type: Sequelize.INTEGER.UNSIGNED, // which goods queues on host_goods
		allowNull: false
	}
}, {
	// prevent sequelize auto-append 's' after tablename
	freezeTableName: true
});

module.exports = Queues;
