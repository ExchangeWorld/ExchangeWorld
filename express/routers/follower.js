var express = require('express');
var router  = express.Router();

// Including tables
var followers = require('../ORM/Followers');
var users     = require('../ORM/Users.js');

// Get ther followers by given my_uid
router.get('/', function(req, res, next) {

	// Available query params:
	//
	// my_uid
	//

	var _my_uid = parseInt(req.query.my_uid, 10);

	followers.belongsTo(users, {foreignKey: 'follower_uid'});

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

// Post a follower by given my_uid and the uid who follows my_uid
router.post('/post', function(req, res, next) {

	// Necessay POST body params:
	//
	// my_uid
	// follower_uid
	//

	var _my_uid       = parseInt(req.body.my_uid, 10);
	var _follower_uid = parseInt(req.body.follower_uid, 10);

	// Create instance
	// But if there is already the pair(my_uid, follower_uid)
	// Then don't create another
	followers
		.sync({force: false})
		.then(function() {
			return followers.findOne({
				where: {
					my_uid: _my_uid,
					follower_uid: _follower_uid
				}
			});
		})
		.then(function(isThereAlready) {
			if (isThereAlready != null) {
				return isThereAlready;
			} else {
				return followers.create({
					my_uid: _my_uid,
					follower_uid: _follower_uid
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

// Delete a follower by given my_uid and the uid who follows my_uid
router.delete('/delete', function(req, res, next) {

	// Necessay POST query params:
	//
	// my_uid
	// follower_uid
	//

	var _my_uid       = parseInt(req.query.my_uid, 10);
	var _follower_uid = parseInt(req.query.follower_uid, 10);

	followers
		.sync({force: false})
		.then(function() {
			return followers.destroy({
				where:{
					my_uid: _my_uid,
					follower_uid: _follower_uid
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
