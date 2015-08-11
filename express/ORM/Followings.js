var Sequelize = require('sequelize');
var sequelize = require('../libs/orm');

// Define the schema of table `seeker`(followingtable)
// I am following 'following'
var Followings = sequelize.define('followings', {
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
	following_uid: {
		type: Sequelize.INTEGER.UNSIGNED, // following's uid 
		allowNull: false
	}
}, {
	// prevent sequelize auto-append 's' after tablename
	freezeTableName: true
});

module.exports = Followings;
