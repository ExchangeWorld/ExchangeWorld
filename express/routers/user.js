var express = require('express');
var router = express.Router();

// including tables 
var user = require('../ORM/User');

router.get('/', function(req, res, next) {

	// Available params:
	// 
	// uid
	// fb_id
	// 

	// Get property:value in ?x=y&z=w....
	var _uid = parseInt(req.query.uid);
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

	// Emit a find operation with orm model in table `user`
	user
		.sync({
			force: false
		})
		.then(function() {
			return user.findAll({
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

router.post('/register', function(req, res, next) {

	// Necessary params
	//
	// fb_id
	// username
	// email
	// nickname
	// photoPath
	//

	var _fb_id = req.body.fb_id;
	var _username = req.body.username;
	var _email = req.body.email;
	var _nickname = req.body.nickname;
	var _photoPath = req.body.photoPath;
	// var _exchangeTable = req.body.exchangeTable;
	// var _followerTable = req.body.followerTable;
	// var _seekerTable = req.body.seekerTable;

	// Create instance
	user
		.sync({force: false})
		.then(function() {
			return user.create({
				fb_id:     _fb_id,
				username:  _username,
				email:     _email,
				nickname:  _nickname,
				photoPath: _photoPath
			});
		})
		.then(function(result) {
			result.exchangeTable = result.uid;
			result.followerTable = result.uid;
			result.seekerTable   = result.uid;
			result.save().then(function() {});
			return result;
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.json({});
		});
});

module.exports = router;
