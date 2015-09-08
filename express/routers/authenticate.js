var express = require('express');
var jwt = require('jsonwebtoken');
var sec_ran = require('secure-random');
var router = express.Router();

// Including tables
var users = require('../ORM/Users');
var auths = require('../ORM/Auths');
var tokens = require('../ORM/Tokens');

// Register a new user
// And return a token (jwt generated)
// Override the registering in /api/user/register
router.post('/register', function(req, res, next) {

	// **WARNING**
	// fb_id will be id
	// user_acess_token will be password
	// **WARNING**

	var _id = req.body.identity;
	var _password = req.body.password;
	var _name = req.body.name;
	var _email = req.body.email || '';
	var _photo_path = req.body.photo_path || '';

	// Create user instance
	users
		.sync({
			force: false
		})
		.then(function() {
			users.create({
				fb_id: _id,
				name: _name,
				email: _email,
				photo_path: _photo_path
			});
		})
		.then(function() {
			var _salt = sec_ran
				.randomArray(3)
				.reduce(function(pre, cur, index, array) {
					return pre * cur;
				})
				.toString(16);

			var _answer = getSHA256(_password + ' and this is a fucking hash with ' + _salt);

			auths
				.sync({
					force: false
				})
				.then(function() {
					return auths.create({
						user_identity: _id,
						salt: _salt,
						answer: _answer
					});
				})
				.catch(function(err) {
					res.json(err);
				});
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.json(err);
		});

});

// Login
var login_function = function(req, res, next) {

	var _id = req.query.identity;
	var _password = req.query.password;

	auths
		.findOne({
			where: {
				user_identity: _id
			}
		})
		.then(function(test_user) {
			if (test_user != undefined && getSHA256(_password + ' and this is a fucking hash with ' + test_user.salt) === test_user.answer) {
				return test_user;
			} else {
				return 'not a user';
			}
		})
		.then(function(test_user) {

			if (test_user === 'not a user') {
				res.json({
					authentication: 'fail',
					token: null
				});
			} else {

				tokens
					.sync({
						force: false
					})
					.then(function() {
						return tokens.create({
							token: jwt.sign({
								identity: _id,
								password: _password
							}, '事實上我們做了快一年', {
								expiresInMinutes: 10
							})
						});
					})
					.then(function(result) {
						res.json({
							authentication: 'success',
							token: result.token
						});
					})
					.catch(function(err) {
						res.json(err);
					});
			}
		})
		.catch(function(err) {
			res.json(err);
		});
};
router.get('/login', login_function);


// Token middleware
var token_function = function(req, res, next) {

	var _token = req.query.token;

	tokens
		.sync({
			force: false
		})
		.then(function() {
			return tokens
				.findOne({
					where: {
						token: _token
					}
				});
		})
		.then(function(result) {

			if (result != null && result != undefined) {
				jwt.verify(result.token, '事實上我們做了快一年', function(err, decoded) {
					if (err) {
						res.json({
							authentication: 'fail',
							err: err
						});
					} else {
						next();
					}
				});

			} else {
				res.json({
					authentication: 'fail',
				});
			}
		})
		.catch(function(err) {
			res.json(err);
		});
};
router.get('/', token_function);

// Hashcode generation function
var getSHA256 = (function(strToEncrypt) {

	var crypto = require('crypto');
	var sha256 = crypto.createHash('sha256');

	sha256.update(strToEncrypt, 'utf8');

	return sha256.digest('hex');
});

module.exports = {
	router: router,
	login: login_function,
	token: token_function
};
