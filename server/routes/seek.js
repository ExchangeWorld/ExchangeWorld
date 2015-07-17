var express    = require('express');
var connection = require('../connectDBPool');
var router     = express.Router();

router.get('/', function(req, res, nex) {
    var queryS = 'SELECT `goods`. * , `user`.`username`, `user`.`photoPath` as `owner_photo` FROM `goods`, `user` WHERE `goods`.`ownerID` = `user`.`fb_id`';
    connection.query(queryS, function(error, rows, fields){
        if(error){ throw error; }
        else
        {
            res.json(rows);
        }
    });
});


module.exports = router;
