var Sequelize = require('sequelize');
var sequelize = require('../orm');

// Define the schema of table `seeker`(followingtable)
var Following = sequelize.define('seeker', {
	sid: {
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
	seeker: {
		type: Sequelize.STRING(128), // following's fb_id 
		allowNull: false
	}
}, {
	// prevent sequelize auto-append 's' after tablename
	freezeTableName: true
});

module.exports = Following;
