var express = require('express');
var goods = require('../ormModel/Goods');
var router = express.Router();

router.get('/', function(req, res, next) {

    // Available params:
    // 
    // gid
    // ownerID
    // 

    // Get property:value in ?x=y&z=w....
    var _gid = parseInt(req.query.gid);
    var _ownerID = req.query.ownerID;

    // If gid or ownerID in query are not defined, then set them to zero or emptyString
    if (!_gid > 0) {
        _gid = 0;
    }

    if (_ownerID == undefined) {
        _ownerID = ""
    }

    if (!_ownerID.length > 0) {
        _ownerID = "";
    }

    // If gid or ownerID appear together, then return undefined
    // Because we want RESTful looking for either the gid of one good or one owner's goods
    if (_gid > 0 && _ownerID != "") {
        res.json(undefined);
    }

    // Emit a find operation with orm model in table `goods`
    goods.sync({
        force: false
    }).then(function() {
        return goods.findAll({
            where: {
                $or: [{
                    gid: _gid
                }, {
                    ownerID: _ownerID
                }]
            }
        });
    }).then(function(result) {
        res.json(result);
    });
});

module.exports = router;
