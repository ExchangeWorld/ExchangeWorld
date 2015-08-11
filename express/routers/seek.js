'use strict';

var express = require('express');
var router  = express.Router();

// Including tables
var goods   = require('../ORM/Goods');
var users    = require('../ORM/Users');

router.get('/', function(req, res, next) {

    // Available query params:
    //
    // title
    // wishlist
    // category
    // position_x
    // position_y
    // from
    // to
    //

    // Get property:value in ?x=y&z=w....
    var _title      = req.query.title;
    var _wishlist   = req.query.wishlist;
    var _category   = req.query.category;
    var _position_x = parseFloat(req.query.position_x);
    var _position_y = parseFloat(req.query.position_y);
    var _from       = parseInt(req.query.from);
    var _to         = parseInt(req.query.to);

	// Set association between tables (users, goods)
	users.hasMany(goods, {foreignKey:'owner_uid'});
	goods.belongsTo(users, {foreignKey: 'uid'});

    // Emit a find operation with orm model in table `goods`
    goods
        .sync({force: false})
        .then(function() {
    		/*
    		 * SELECT `goods`.*, `users`.*
    		 *   FROM `goods`, `users`
    		 *  WHERE `goods`.owner_uid = `users`.uid AND `goods`.name = %title%
             */
    		return goods.findAll({
                where: {
                    gname: {
                        $like: '%' + title + '%'
                    },
                    status: 0
                },
    			include: [users]
            });
        })
        .then(function(result) {
            res.json(result);
        });
});

module.exports = router;
