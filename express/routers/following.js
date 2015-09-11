var express = require('express');
var router  = express.Router();

// Including tables
var followings = require('../ORM/Followings');
var users      = require('../ORM/Users.js');

// Get ther followings by given my_uid
router.get('/', function(req, res, next) {

	// Available query params:
	//
	// my_uid
	//

	var _my_uid = parseInt(req.query.my_uid, 10);

	followings.belongsTo(users, {foreignKey: 'following_uid'});

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
				include:[
					{model: users}
				]
			});
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.send({error: err});
		});
});

// Post a following by given my_uid and the uid which my_uid follow
router.post('/post', function(req, res, next) {

	// Necessay POST body params:
	//
	// my_uid
	// following_uid
	//

	var _my_uid        = parseInt(req.body.my_uid, 10);
	var _following_uid = parseInt(req.body.following_uid, 10);

	followings
		.sync({force: false})
		.then(function() {
			return followings.findOne({
				where: {
					my_uid: _my_uid,
					following_uid: _following_uid
				}
			});
		})
		.then(function(isThereAlready) {
			if (isThereAlready != null) {
				return isThereAlready;
			} else {
				return followings.create({
					my_uid: _my_uid,
					following_uid: _following_uid
				});
			}
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.send({error: err});
		});

});

// Delete a following by given my_uid and the uid which my_uid follow
router.delete('/delete', function(req, res, next) {

	// Necessay POST query params:
	//
	// my_uid
	// following_uid
	//

	var _my_uid        = parseInt(req.query.my_uid, 10);
	var _following_uid = parseInt(req.query.following_uid, 10);

	followings
		.sync({force: false})
		.then(function() {
			return followings.destroy({
				where:{
					my_uid: _my_uid,
					following_uid: _following_uid
				}
			});
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.send({error: err});
		});
});

module.exports = router;
