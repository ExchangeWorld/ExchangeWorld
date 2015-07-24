var mysql = require('mysql');

//Create a pool
var pool = mysql.createPool({
	connectionLimit: 1688,
	host: 'localhost',
	user: 'root',
	password: require('./authenication'),
	database: 'exchangeworld',
	debug: false
});

module.exports = pool;
