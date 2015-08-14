var Sequelize = require('sequelize');
var sequelize = require('../libs/orm');

// Define the schema of table `comments`
var Comments = sequelize.define('comments', {
	cid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	},
	goods_gid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false
	},
	commenter_uid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false
	},
	content: {
		type: Sequelize.TEXT,
		allowNull: false
	}
});

module.exports = Comments;
