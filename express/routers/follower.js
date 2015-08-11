var express = require('express');
var router  = express.Router();

// Including tables
var followers = require('../ORM/Followers');

router.get('/', function(req, res, next) {

	// Available query params:
	//
	// uid
	//

	var _my_uid = parseInt(req.query.uid);

	// Emit a find operation with orm in table `followers`
	followers
		.sync({force: false})
		.then(function() {

			/*
			 * SELECT *
			 * FROM `followers`
			 * WHERE `followers`.`my_uid` = _my_uid
			 */

			return followers.findAll({
				where: {
					my_uid : _my_uid
				},
			});
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.json({});
		});
});

module.exports = router;
