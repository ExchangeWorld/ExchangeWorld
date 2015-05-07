var express = require('express');
var connection = require('../connectDB');
var router = express.Router();

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'ExchangWorld' });
});

router.get('/seekkk', function(req, res, nex) {

    var queryS = 'SELECT `goods`. * , `user`.`username`, `user`.`photoPath` as `owner_photo` FROM `goods`, `user` WHERE `goods`.`ownerID` = `user`.`fb_id`';
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

});

module.exports = router;
