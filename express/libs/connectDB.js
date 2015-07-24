var mysql = require('mysql');

//建立連線
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: require('./authenication'),
	database: 'exchangeworld'
});

connection.connect();

module.exports = connection;
