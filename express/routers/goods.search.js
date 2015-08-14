'use strict';

var express = require('express');
var router  = express.Router();

// Including tables
var goods   = require('../ORM/Goods');
var users   = require('../ORM/Users');

router.get('/', function(req, res, next) {

	// Available query params:
	//
	// name
	// wishlist
	// category
	// position_x
	// position_y
	// from
	// to
	//

	// Get property:value in ?x=y&z=w....
	var name       = req.query.name || '';
	var wishlist   = req.query.wishlist || '';
	var category   = req.query.category || '';
	var position_x = parseFloat(req.query.position_x) || -1.0;
	var position_y = parseFloat(req.query.position_y) || -1.0;
	var from       = parseInt(req.query.from, 10) || -1;
	var to         = parseInt(req.query.to, 10) || -1;

	// Set association between tables (users, goods)
	users.hasMany(goods, {foreignKey:'owner_uid'});
	goods.belongsTo(users, {foreignKey: 'owner_uid'});

	// Emit a find operation with orm model in table `goods`
	goods
		.sync({force: false})
		.then(function() {

			return goods.findAll({
				where: {
					$and: [{
						name:     (name     == '' ? {$like: '%'} : name),
						category: (category == '' ? {$like: '%'} : category)
					}],
					status: 0,
					deleted: 0
				},
				include: [users]
			});
		})
		.then(function(result) {
			if (result.length == 0) {
				res.json({});
			} else {
				res.json(result);
			}
		});
});

module.exports = router;
