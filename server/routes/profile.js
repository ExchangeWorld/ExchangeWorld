var express = require('express');
var connection = require('../connectDB');
var router = express.Router();

router.get('/', function(req, res, nex) {

    var queryS = 'SELECT * FROM user WHERE fb_id LIKE ' + req.query.pid;
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