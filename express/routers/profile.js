'use strict';

var express = require('express');
var connection = require('../libs/connectDBPool.js');
var router = express.Router();

/**
 * GET /api/profile?pid=xx&token=xxxxxxxxx
 *
 *
 */
router.get('/', function(req, res, nex) {

	var queryS = 'SELECT * FROM user WHERE fb_id LIKE ' + req.query.pid;
	connection.query(queryS, function(error, rows, fields){

		if(error) throw error;
		else {
			res.json(rows);
		}
	});

});

module.exports = router;
