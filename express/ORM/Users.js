var Sequelize = require('sequelize');
var sequelize = require('../libs/orm');

// Define the schema of table `users`
var Users = sequelize.define('users', {
	uid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	fb_id: {
		type: Sequelize.STRING(128),
		allowNull: false,
		unique: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: true 
	},
	photo_path: {
		type: Sequelize.STRING,
		allowNull: true
	},
	introduction: {
		type: Sequelize.TEXT,
		allowNull: true
	},
	wishlist: {
		type: Sequelize.TEXT,
		allowNull: true
	}
}, {
	// prevent sequelize auto-append 's' after tablename
	freezeTableName: true
});

module.exports = Users;
