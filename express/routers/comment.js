var express = require('express');
var router = express.Router();

// Including tables
var comments = require('../ORM/Comments');

// Get comments of a goods
router.get('/of/goods', function(res, req, next) {

});

// Get Comments of a user
router.get('/of/user', function(res, req, next) {

});

// Post a comment to a goods
router.post('/post', function(res, req, next) {

});

// Edit a comment
router.put('/edit', function(res, req, next) {

});

// Delete a comment
router.delete('/delete', function(res, req, next) {

});

module.exports = router;
