var express = require('express');
var connection = require('../connectDB');
var router = express.Router();

router.get('/', function(req, res, nex) {

    var queryS = 'SELECT `goods`. * , `user`.`username`, `user`.`photoPath` as `owner_photo` FROM `goods`, `user` WHERE `goods`.`gid` = ' + req.query.gid + ' AND `goods`.`ownerID` = `user`.`fb_id`';
    connection.query(queryS, function(error, rows, fields){
        if(error){ throw error; }
        else
        {
            res.json(rows);
            //console.log(rows);
        }
    });
});


module.exports = router;
