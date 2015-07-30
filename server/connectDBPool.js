var mysql = require('mysql');

//Create a pool
const pool = mysql.createPool({
    connectionLimit: 1688,
    host: 'localhost',
    user: 'root',
    password: '4444',
    database: 'exchangeworld',
    debug: false
});

module.exports = pool;
