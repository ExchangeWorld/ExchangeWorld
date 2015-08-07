var express = require('express');
var router = express.Router();

// including tables
var goods = require('../ORM/Goods');

// Create a good
router.post('/', function(req, res, next) {

	// Available params:
    // 
    // gname
    // categories
    // description
    // posX
    // posY
    // ownerID
    //

    // Get property:value in ?x=y&z=w....
    var _gname = req.body.gname;
    var _categories = req.body.categories;
    var _description = req.body.description;
    var _want = ''; // But will be deprecated soon
    var _posX = parseFloat(req.body.posX);
    var _posY = parseFloat(req.body.posY);
    var _ownerID = req.body.ownerID;

    // Create instance
    goods.sync({
        force: false
    }).then(function() {
        return goods.create({
            gname: _gname,
            categories: _categories,
            description: _description,
            want: _want,
            posX: _posX,
            posY: _posY,
            ownerID: _ownerID
        });
    }).then(function(result) {
        res.json(result);
    });

});

module.exports = router;
