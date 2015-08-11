var express = require('express');
var router = express.Router();

// Including tables
var stars = require('../ORM/Stars');

// Get users that star the goods
router.get('/to', function(res, req, next) {

});

// Get goods that user stars
router.get('/by', function(res, req, next) {

});

// Make a star to a goods
router.post('/post', function(res, req, next) {

});

// Delete a star
router.delete('/delete', function(res, req, next) {

});

module.exports = router;
