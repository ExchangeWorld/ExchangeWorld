var express = require('express');
var router = express.Router();

// Including tables
var users = require('../ORM/Users');
var tokens = require('../ORM/Tokens');

// Validate a token
// If not available, return failure
router.get('/validate', function(req, res, next) {

	// Available query params:
    //
    // token
    //

	var _token = req.query.token;

	tokens
		.sync({
			force: false
		})
		.then(function() {
			return tokens.findOne({
				where: {
					token: _token
				}
			})
		})
		.then(function(result) {
			if (result == null) {
				res.json({
					authentication: 'fail',
					token: {}
				});
			} else {
				res.json({
					authentication: 'success',
					token: result
				});
			}
		});

});

// Get a token for the user
// Or update a token for the user
router.get('/getToken', function(req, res, next) {

	// Available query params:
    //
    // uid
    //

	var _uid       = parseInt(req.query.uid);
	var _timeStamp = (new Date()).toLocaleString();

	// Make sure there is a user's uid is available
	// Find one and update the token
	// If not found, create one
	tokens
		.sync({
			force: false
		})
		.then(function() {
			return users.findOne({
				where: {
					uid: _uid
				}
			});
		})
		.then(function(result) {
			if (result == null) {
				return 'not a user';
			} else {
				return tokens.findOne({
					where: {
						user_uid: _uid
					}
				});
			}
		})
		.then(function(result) {
			if (result == null) {
				return tokens.create({
					user_uid: _uid,
					token: getSHA256(_uid + '_atTime_' + _timeStamp)
				});
			} else if (result == 'not a user') {
				return {};
			} else {
				result.token = getSHA256(_uid + '_atTime_' + _timeStamp);
				result.save().then(function() {});
				return result;
			}
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.json({});
		});

});

// Hashcode generation function
var getSHA256 = (function(strToEncrypt) {

	var crypto = require('crypto');
	var sha256 = crypto.createHash('sha256');

	sha256.update(strToEncrypt, 'utf8');

	return sha256.digest('hex');
});

module.exports = router;
