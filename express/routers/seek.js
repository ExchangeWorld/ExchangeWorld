'use strict';

var express = require('express');
var router  = express.Router();

// including tables 
var goods   = require('../ORM/Goods');
var user    = require('../ORM/User');

router.get('/', function(req, res, next) {

    // Available params:
    // 
    // title
    // wishlist
    // category
    // px
    // py
    // from
    // to
    //

    // Get property:value in ?x=y&z=w....
    var title    = req.query.title || '';
	console.log(title);
    var wishlist = req.query.wishlist || '';
    var category = req.query.category || '';
    var px       = parseFloat(req.query.px) || '';
    var py       = parseFloat(req.query.py) || '';
    var from     = parseInt(req.query.from) || '';
    var to       = parseInt(req.query.to) || '';

	// Set association between tables (user, goods)
	user.hasMany(goods, {foreignKey:'ownerID'});
	goods.belongsTo(user, {foreignKey: 'ownerID'});

    // Emit a find operation with orm model in table `goods`
    goods
        .sync({force: false})
        .then(function() {
    		/**
    		 * SELECT `goods`.*, `user`.* 
    		 * FROM `goods`, `user`
    		 * WHERE `goods`.ownerID = `user`.fb_id AND `goods`.name = %title% 
             */
    		return goods.findAll({
                where: {
                    gname: {
                        $like: '%' + title + '%'
                    },
                    status: 0
                },
    			include: [user]
            });
        })
        .then(function(result) {
            res.json(result);
        });
});

module.exports = router;
