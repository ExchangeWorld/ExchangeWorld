var connection = require('./connectDBPool');

connection.query('SELECT * FROM `goods`', function(err, rows, fields) {
    if (err) throw err;
    console.log(rows);
});
