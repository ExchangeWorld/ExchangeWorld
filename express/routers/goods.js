var express = require('express');
var router  = express.Router();

// including tables
var goods    = require('../ORM/Goods');
var user     = require('../ORM/User');
var comments = require('../ORM/Comments');

router.get('/', function(req, res, next) {

    // Available params:
    // 
    // gid
    // ownerID
    // 

    // Get property:value in ?x=y&z=w....
    var _gid     = parseInt(req.query.gid);
    var _ownerID = req.query.ownerID;

    // If gid or ownerID in query are not defined, then set them to zero or emptyString
    if (!_gid > 0) {
        _gid = 0;
    }

    if (_ownerID === undefined) {
        _ownerID = "";
    }

    if (!_ownerID.length > 0) {
        _ownerID = "";
    }

    // If gid or ownerID appear together, then return undefined
    // Because we want RESTful looking for either the gid of one good or one owner's goods
    if (_gid > 0 && _ownerID !== "") {
        res.json(undefined);
    }

	// Set association between tables (user, goods)
	user.hasMany(goods, {foreignKey:'ownerID'});
	goods.belongsTo(user, {foreignKey: 'ownerID'});
	goods.hasMany(comments, {foreignKey:'goods_id'});
	comments.belongsTo(goods, {foreignKey:'goods_id'});

    // Emit a find operation with orm model in table `goods`
    goods
        .sync({force: false})
        .then(function() {
    		/**
     		 * SELECT `goods`. * , `user`.*, `comments`.*
    		 * FROM `goods`, `user`, `comments`
    		 * WHERE `goods`.`gid` = '_gid' 
    		 *   AND `goods`.`ownerID` = `user`.`fb_id` 
    		 *   AND `goods`.`ownerID` = `comments`.`commenter`
    		 */
            return goods.findAll({
                where: {
                    $or: [{
                        gid: _gid
                    }, {
                        ownerID: _ownerID
                    }]
                },
    			include: [user, comments]
            });
        })
        .then(function(result) {
            res.json(result);
        });
});

module.exports = router;
