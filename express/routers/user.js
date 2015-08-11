var express = require('express');
var router = express.Router();

// Including tables
var users = require('../ORM/Users');

// Get a user
router.get('/', function(req, res, next) {

	// Available query params:
	//
	// uid
	// fb_id
	//

	// Get property:value in ?x=y&z=w....
	var _uid   = parseInt(req.query.uid);
	var _fb_id = req.query.fb_id;

	// If uid or fb_id in query are not defined, then set them to zero or emptyString
	if (!_uid > 0) {
		_uid = 0;
	}

	if (_fb_id == undefined) {
		_fb_id = "";
	}

	if (!_fb_id.length > 0) {
		_fb_id = "";
	}

	// Emit a find operation with orm in table `users`
	users
		.sync({
			force: false
		})
		.then(function() {
			return users.findAll({
				where: {
					$or: [{
						uid: _uid
					}, {
						fb_id: _fb_id
					}]
				}
			});
		})
		.then(function(result) {
			res.json(result);
		});
});

// Register a user
router.post('/register', function(req, res, next) {

	// Necessary params
	//
	// fb_id
	// name
	// email
	// nickname
	// photoPath
	//

	var _fb_id     = req.body.fb_id;
	var _name      = req.body.name;
	var _email     = req.body.email;
	var _photoPath = req.body.photoPath;

	// Create instance
	users
		.sync({force: false})
		.then(function() {
			return users.create({
				fb_id:     _fb_id,
				name:      _name,
				email:     _email,
				photoPath: _photoPath
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
