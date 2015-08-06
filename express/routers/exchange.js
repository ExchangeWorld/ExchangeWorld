var express = require('express');
var router = express.Router();

// including tables
var exchanges = require('../ORM/Exchanges');

// These routes are really dangerous
// Only use them when you know what are you doing

// Create a new exchange
router.get('/create', function(req, res, next) {

    // Available params:
    // 
    // gid1 (smaller gid)
    // gid2 (larger gid)
    //

    // Get property:value in ?x=y&z=w....
    var __gid1 = parseInt(req.query.gid1);
    var __gid2 = parseInt(req.query.gid2);

    // And make sure gid1 <= gid2
    var _gid1 = (__gid1 <= __gid2 ? __gid1 : __gid2);
    var _gid2 = (__gid2 > __gid1 ? __gid2 : __gid1);

    // Create instance
    exchanges.sync({
        force: false
    }).then(function() {
        return exchanges.create({
            gid1: _gid1,
            gid2: _gid2
        });
    }).then(function(result) {
        res.json(result);
    });
});

// Delete a exchange
router.get('/delete', function(req, res, next) {

    // Available params:
    // 
    // gid1 (smaller gid)
    // gid2 (larger gid)
    //

    // Get property:value in ?x=y&z=w....
    var __gid1 = parseInt(req.query.gid1);
    var __gid2 = parseInt(req.query.gid2);

    // And make sure gid1 <= gid2
    var _gid1 = (__gid1 <= __gid2 ? __gid1 : __gid2);
    var _gid2 = (__gid2 > __gid1 ? __gid2 : __gid1);

    // Delete instance where gid1 and gid2 matched
    exchanges.sync({
        force: false
    }).then(function() {
        return exchanges.destroy({
            where: {
                $and: [{
                    gid1: _gid1
                }, {
                    gid2: _gid2
                }]
            }
        });
    }).then(function(result) {
        res.json([{
            deletedNum: result
        }]);
    });
});

// Set the status of a exchange
router.get('/status', function(req, res, next) {

    // Available params:
    // 
    // gid1 (smaller gid)
    // gid2 (larger gid)
    //

    // Get property:value in ?x=y&z=w....
    var __gid1 = parseInt(req.query.gid1);
    var __gid2 = parseInt(req.query.gid2);

    // And make sure gid1 <= gid2
    var _gid1 = (__gid1 <= __gid2 ? __gid1 : __gid2);
    var _gid2 = (__gid2 > __gid1 ? __gid2 : __gid1);

    // Find instance and update status to 1(complete) then save
    exchanges.sync({
        force: false
    }).then(function() {
        return exchanges.findOne({
            where: {
                $and: [{
                    gid1: _gid1
                }, {
                    gid2: _gid2
                }]
            }
        });
    }).then(function(result) {
        result.status = 1;
        result.save().then(function() {});
        return result;
    }).then(function(result) {
        res.json(result);
    });
});

module.exports = router;
