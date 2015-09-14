var Sequelize = require('sequelize');
var sequelize = require('../libs/orm');

// Define the schema of table `goods`
var Goods = sequelize.define('goods', {
	gid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	owner_uid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	photo_path: {
		type: Sequelize.STRING,
		allowNull: true
	},
	category: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: {
		type: Sequelize.TEXT,
		allowNull: true
	},
	position_x: {
		type: Sequelize.FLOAT,
		allowNull: false,
		defaultValue: -1
	},
	position_y: {
		type: Sequelize.FLOAT,
		allowNull: false,
		defaultValue: -1
	},
	// 0 means not exchanged yet, 1 means exchanged
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	// 0 means not deleted yet, 1 means deleted
	deleted: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0
	}
});

module.exports = Goods;
