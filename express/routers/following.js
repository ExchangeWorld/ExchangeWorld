var express = require('express');
var router  = express.Router();

// Including tables
var followings = require('../ORM/Followings');

router.get('/', function(req, res, next) {

	// Available query params:
	//
	// uid
	//

	var _my_uid = parseInt(req.query.uid);

	// Emit a find operation with orm in table `followings`
	followings
		.sync({force: false})
		.then(function() {

			/*
			 * SELECT *
			 * FROM `followings`
			 * WHERE `followings`.`my_uid` = _my_uid
			 */

			return followings.findAll({
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
