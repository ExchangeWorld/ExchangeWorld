var express = require('express');
var router  = express.Router();

// including tables 
var user      = require('../ORM/User');
var goods     = require('../ORM/Goods');
var follower  = require('../ORM/Follower');
var following = require('../ORM/Following');

router.get('/', function(req, res, next) {

	// Available params:
	// 
	// fb_id 
	// 

	// Get property:value in ?x=y&z=w....
	var _fb_id = req.query.fb_id;

	/** 
	 * Set association between tables (user, goods, follower, following)
	 * 
	 * USER 
	 *  |---(1:M)--- GOODS
	 *  |---(1:M)--- FOLLOWING
	 *  `---(1:M)--- FOLLOWER
	 */
	user.hasMany(goods, {foreignKey: 'ownerID'});
	user.hasMany(follower, {foreignKey: 'myid'});
	user.hasMany(following, {foreignKey: 'myid'});
	goods.belongsTo(user, {foreignKey: 'ownerID'});
	follower.belongsTo(user, {foreignKey: 'myid'});
	following.belongsTo(user, {foreignKey: 'myid'});

	// Emit a find operation with orm model in table `user`
	user
		.sync({force: false})
		.then(function() {

			/**
			 * SELECT `goods`. * , `user`.*
			 * FROM `goods`, `user`
			 * WHERE `user`.`fb_id` = '_fb_id' 
			 *   AND `user`.`fb_id` = `goods`.`ownerID`
			 *   AND `user`.`fb_id` = `followertable`.`myid`
			 *   AND `user`.`fb_id` = `seeker`.`myid`
			 */
			 
			return user.findAll({
				where: {
					fb_id : _fb_id
				},
				include: [goods, follower, following]
			});
		})
		.then(function(result) {
			res.json(result);
		});
});

router.get('/edit', function(req, res, next) {

	var _fb_id = req.query.fb_id;
	var _username = req.query.username;
	var _email = req.query.email;
	var _nickname = req.query.nickname;
	var _wishlist = req.query.wishlist;
	var _introduction = req.query.introduction;

	user
		.sync({force: false})
		.then(function () {
			return user.findOne({
				where: {
					fb_id: _fb_id
				}
			});
		})
		.then(function(result) {
			if (result == null) {
				return {};
			} else {
				result.username = _username;
				result.email = _email;
				result.nickname = _nickname;
				result.wishlist = _wishlist;
				result.introduction = _ introduction;
				result.save().then(function () {});
				return result;
			}
		})
		.then(function(result) {
			res.json(result);
		});

});


module.exports = router;
