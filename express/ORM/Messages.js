var Sequelize = require('sequelize');
var sequelize = require('../libs/orm');

// Define the schema of table `messages`
var Messages = sequelize.define('messages', {
	mid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	},
	sender_uid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false
	},
	receiver_uid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: true
	},
	chatroom_cid: {
		type: Sequelize.STRING,
		defaultValue: '-1',
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	unread: {
		type: Sequelize.BOOLEAN,
		defaultValue: true,
		allowNull: false
	}
}, {
	timestamps: true,
	createdAt: 'timestamp',
	updatedAt: false
});

module.exports = Messages;
