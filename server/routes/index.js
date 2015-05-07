var express = require('express');
var mysql = require('mysql');
var router = express.Router();

//建立連線
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'momomo5',
    database: 'exchangeworld'
});
//開始連接
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'ExchangWorld' });
});

router.get('/seekkk', function(req, res, nex) {

    var queryS = 'SELECT `goods`. * , `user`.`username`, `user`.`photoPath` as `owner_photo` FROM `goods`, `user` WHERE `goods`.`ownerID` = `user`.`fb_id`';
    //接著就可以開始進行查詢
    connection.query(queryS, function(error, rows, fields){
        if(error){ throw error; }
        else
        {
            console.log(rows);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(rows));            
        }
    });
//    connection.end();
    
    //console.log("gopyupylk");
});

module.exports = router;
