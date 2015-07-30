var express = require('express');
var router  = express.Router();

// including tables 
var user      = require('../ormModel/User.js');
var goods     = require('../ormModel/Goods');
var follower  = require('../ormModel/Follower.js');
var following = require('../ormModel/Following.js');

router.get('/', function(req, res, nex) {

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
//console.log("kfkkkf");

	// Emit a find operation with orm model in table `user`
	user.sync({
		force: false
	}).then(function() {
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
	}).then(function(result) {
		res.json(result);
	});
	
});


module.exports = router;
