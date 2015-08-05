var express = require('express');
var user = require('../ORM/User');
var router = express.Router();

router.get('/', function(req, res, next) {

    // Available params:
    // 
    // uid
    // fb_id
    // 

    // Get property:value in ?x=y&z=w....
    var _uid = parseInt(req.query.uid);
    var _fb_id = req.query.fb_id;

    // If uid or fb_id in query are not defined, then set them to zero or emptyString
    if (!_uid > 0) {
        _uid = 0;
    }

    if (_fb_id == undefined) {
        _fb_id = "";
    }

    if (!_fb_id.length > 0) {
        _fb_id = "";
    }

    // Emit a find operation with orm model in table `user`
    user.sync({
        force: false
    }).then(function() {
        return user.findAll({
            where: {
                $or: [{
                    uid: _uid
                }, {
                    fb_id: _fb_id
                }]
            }
        });
    }).then(function(result) {
        res.json(result);
    });
});

module.exports = router;
