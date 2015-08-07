var express = require('express');
var router = express.Router();

// including tables
var user = require('../ORM/User');

// Validate a user
router.get('/user', function(req, res, next) {

    var userID = req.query.uid;
    var timeStamp = (new Date()).toLocaleString();

    res.json({
        hashcode: getSHA256(userID + '_atTime_' + timeStamp)
    });

});

// Hash function
var getSHA256 = (function(strToEncrypt) {

    var crypto = require('crypto');
    var sha256 = crypto.createHash('sha256');

    sha256.update(strToEncrypt, 'utf8');

    return sha256.digest('hex');
});

module.exports = router;
