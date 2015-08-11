var Sequelize = require('sequelize');
var sequelize = require('../libs/orm');

// Define the schema of table `followers`
// 'Follower' is following me
var Followers = sequelize.define('followers', {
	fid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	},
	my_uid: {
		type: Sequelize.INTEGER.UNSIGNED, // my uid
		allowNull: false
	},
	follower_uid: {
		type: Sequelize.INTEGER.UNSIGNED, // follower's uid
		allowNull: false
	}
}, {
	// prevent sequelize auto-append 's' after tablename
	freezeTableName: true
});

module.exports = Followers;
