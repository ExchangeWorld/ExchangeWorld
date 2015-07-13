var express    = require('express');
var connection = require('../connectDB');
var router     = express.Router();

router.get('/', function(req, res, nex) {
    var queryS = 'SELECT `goods`. * , `user`.`username`, `user`.`photoPath` as `owner_photo` FROM `goods`, `user` WHERE `goods`.`gid` = ' + req.query.gid + ' AND `goods`.`ownerID` = `user`.`fb_id`';
    console.log(req.query.gid);
    connection.query(queryS, function(error, rows, fields){
        if(error){ throw error; }
        else
        {
            res.json(rows);
        }
    });
    //res.json({ hihi: "testtt"});
});


module.exports = router;
