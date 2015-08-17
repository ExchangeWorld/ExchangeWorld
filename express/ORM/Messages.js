var Sequelize = require('sequelize');
var sequelize = require('../libs/orm');

// Define the schema of table `messages`
var Messages = sequelize.define('messages', {
	qid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	},
	sender_uid: {
		type: Sequelize.INTEGER.UNSIGNED, // which goods has a queue
		allowNull: false
	},
	receiver_uid: {
		type: Sequelize.INTEGER.UNSIGNED, // which goods queues on host_goods
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	}
}, {
	timestamps: true,
	createAt: 'timestamp',
	updatedAt: false
});

module.exports = Messages;
