var Sequelize = require('sequelize');
var sequelize = require('../orm');

// Define the schema of table `comments`
var Comments = sequelize.define('comments', {
	cid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	},
	goods_id: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false
	},
	commenter: {
		type: Sequelize.STRING(128),
		allowNull: false
	},
	comment: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = Comments;
