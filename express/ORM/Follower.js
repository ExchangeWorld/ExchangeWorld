var Sequelize = require('sequelize');
var sequelize = require('../libs/orm');

// Define the schema of table `followertable`
var Follower = sequelize.define('followertable', {
	fid: {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull: false,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	},
	myid: {
		type: Sequelize.STRING(128), // my fb_id 
		allowNull: false
	},
	follower: {
		type: Sequelize.STRING(128), // my follower's fb_id
		allowNull: false
	}
}, {
	// prevent sequelize auto-append 's' after tablename
	freezeTableName: true
});

module.exports = Follower;
