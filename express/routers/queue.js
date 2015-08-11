var express = require('express');
var router = express.Router();

// Including tables
var queues = require('../ORM/Queues');

// Get queues of a goods
router.get('/', function(res, req, next) {

});

// Post a queue (queuer_goods_gid -> host_goods_gid)
router.post('/post', function(res, req, next) {

});

// Delete a queue
router.delete('/delete', function(res, req, next) {

});

module.exports = router;
