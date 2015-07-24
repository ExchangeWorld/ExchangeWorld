var express = require('express');
var goods = require('../ormModel/Goods');
var router = express.Router();

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
    var title = req.query.title;
    var wishlist = req.query.wishlist;
    var category = req.query.category;
    var px = parseFloat(req.query.px);
    var py = parseFloat(req.query.py);
    var from = parseInt(req.query.from);
    var to = parseInt(req.query.to);

    // Emit a find operation with orm model in table `goods`
    goods.sync({
        force: false
    }).then(function() {
        return goods.findAll({
            where: {
                gname: {
                    $like: '%' + title + '%'
                },
                status: 0
            }
        });
    }).then(function(result) {
        res.json(result);
    });
});

module.exports = router;
