'use strict';

var express    = require('express');
var connection = require('../libs/connectDBPool.js');
var router     = express.Router();

/**
 * GET /api/goods?gid=xx .....
 *
 *
 */
router.get('/', function(req, res) {
	var queryS = 'SELECT `goods`. * , `user`.`username`, `user`.`photoPath` as `owner_photo` FROM `goods`, `user` WHERE `goods`.`gid` = ' +
	req.query.gid + ' AND `goods`.`ownerID` = `user`.`fb_id`';

	connection.query(queryS, function(error, rows, fields) {
		if(error) throw error;
		else res.json(rows);
	});

});


module.exports = router;
