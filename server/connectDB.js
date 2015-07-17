var mysql = require('mysql');

//建立連線
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12241224',
    database: 'exchangeworld'
});

connection.connect();

module.exports = connection;
