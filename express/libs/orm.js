var Sequelize = require('sequelize');
var DBLogin   = require('./DBLogin');

// Export a orm model with some config
var sequelize = new Sequelize('exchangeworld', DBLogin.ID, DBLogin.password, {
	host: 'localhost',
	dialect: 'mysql',
	// dialect: 'postgres',

	// We will use another async-logger soon
	logging: false,

	// maxConcurrentQueries: 200,

	// When server fired, check all the schema
	// BUT NOT while every visit
	// sync: { force: true },

	pool: {
		maxConnections: 16,
		minConnections: 4,
		maxIdleTime: 3000
	},

	define: {
		timestamps: false,
		charset: 'utf8',
		collate: 'utf8_general_ci'
	}
});

module.exports = sequelize;
