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

	var name       = req.query.name || '';
	var wishlist   = req.query.wishlist || '';
	var category   = req.query.category || '';
	var position_x = parseFloat(req.query.position_x) || -1.0;
	var position_y = parseFloat(req.query.position_y) || -1.0;
	var bound      = req.query.bound || '-90,0,90,180';
	var from       = parseInt(req.query.from, 10) || -1;
	var to         = parseInt(req.query.to, 10) || -1;

	/**
	 * [ lat_lo, lng_lo, lat_hi, lng_hi ] for this bounds,
	 *   where "lo" corresponds to the southwest corner of the bounding box,
	 *   while "hi" corresponds to the northeast corner of that box.
	 */
	var boundArray = bound.split(',').map(parseFloat);

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
						name:     (name     === '' ? {$like: '%'} : {$like: '%' + name + '%'}),
						category: (category === '' ? {$like: '%'} : category)
					}],
					position_x: {
						gt:boundArray[1],
						lt:boundArray[3] 
					},
					position_y: {
						gt:boundArray[0],
						lt:boundArray[2]
					},
					status: 0,
					deleted: 0
				},
				include: [{model: users, required: true}]
			});
		})
		.then(function(result) {
			res.json(result);
		});
});

module.exports = router;
