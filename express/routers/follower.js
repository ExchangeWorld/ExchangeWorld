var express = require('express');
var router  = express.Router();

// including tables 
var follower = require('../ORM/Follower');

router.get('/', function(req, res, next) {

	// Available params:
	// 
	// fb_id 
	// 

	var _fb_id = req.query.fb_id;


	// Emit a find operation with orm model in table `follower`
	follower
		.sync({force: false})
		.then(function() {

			/**
			 * SELECT * 
			 * FROM `follower`
			 * WHERE `follower`.`myid` = _fb_id
			 */

			return follower.findAll({
				where: {
					myid : _fb_id
				},
			});
		})
		.then(function(result) {
			res.json(result);
		});
});


module.exports = router;
