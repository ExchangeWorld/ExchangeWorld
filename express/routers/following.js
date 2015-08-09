var express = require('express');
var router  = express.Router();

// including tables 
var following = require('../ORM/Following');

router.get('/', function(req, res, next) {

	// Available params:
	// 
	// fb_id 
	// 

	var _fb_id = req.query.fb_id;


	// Emit a find operation with orm model in table `following`
	following
		.sync({force: false})
		.then(function() {

			/**
			 * SELECT * 
			 * FROM `following`
			 * WHERE `following`.`myid` = _fb_id
			 */

			return following.findAll({
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
