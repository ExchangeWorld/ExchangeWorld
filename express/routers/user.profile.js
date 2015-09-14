var express = require('express');
var router  = express.Router();

// Including tables
var users      = require('../ORM/Users');
var goods      = require('../ORM/Goods');
var followers  = require('../ORM/Followers');
var followings = require('../ORM/Followings');

// Get a profile
router.get('/', function(req, res, next) {

	// Available query params:
	//
	// uid
	//

	// Get property:value in ?x=y&z=w....
	var _uid = parseInt(req.query.uid, 10);

	/*
	 * Set association between tables (users, goods, followers, followings)
	 *
	 * USER
	 *  |---(1:M)--- GOODS
	 *  |---(1:M)--- FOLLOWING
	 *  `---(1:M)--- FOLLOWER
	 */
	users.hasMany(goods, {foreignKey: 'owner_uid'});
	users.hasMany(followers, {foreignKey: 'my_uid'});
	users.hasMany(followings, {foreignKey: 'my_uid'});
	goods.belongsTo(users, {foreignKey: 'owner_uid'});
	followers.belongsTo(users, {foreignKey: 'my_uid'});
	followings.belongsTo(users, {foreignKey: 'my_uid'});

	// Emit a find operation with orm model in table `users`
	users
		.sync({force: false})
		.then(function() {

			/*
			 * SELECT `goods`. * , `users`.*
			 *   FROM `goods`, `users`
			 *  WHERE `users`.`uid` = '_uid'
			 *    AND `users`.`uid` = `goods`.`owner_uid`
			 *    AND `users`.`uid` = `followers`.`my_uid`
			 *    AND `users`.`uid` = `follwings`.`my_uid`
			 */

			return users.findOne({
				where: {
					uid : _uid
				},
				include:[
					{model: goods},
					{model: followers},
					{model: followings}
				]
			});
		})
		.then(function(result) {
			if (result == null) {
				res.json({});
			} else {
				var data = [];
				data.push(result);
				res.json(data);
			}
		})
		.catch(function(err) {
			res.send({error: err});
			//console.log
			//res.json({});
		});
});

// Edit a profile
router.put('/edit', function(req, res, next) {

	// Available PUT body params:
    //
    // uid
    // name
    // email
	// introduction
	// wishlist
	//

	var _uid          = parseInt(req.body.uid, 10);
	var _name         = req.body.name;
	var _email        = req.body.email;
	var _introduction = req.body.introduction;
	var _wishlist     = req.body.wishlist;

	users
		.sync({force: false})
		.then(function () {
			return users.findOne({
				where: {
					uid: _uid
				}
			});
		})
		.then(function(result) {
			if (result == null) {
				return {};
			} else {
				result.name         = _name;
				result.email        = _email;
				result.introduction = _introduction;
				result.wishlist     = _wishlist;
				result.save().then(function() {});
				return result;
			}
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.send({error: err});
		});

});

module.exports = router;
