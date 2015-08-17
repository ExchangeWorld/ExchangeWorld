var express = require('express');
var router = express.Router();

// Including tables
var notifications = require('../ORM/Notifications');

router.get('/', function(req, res, next) {

	// Available GET params:
	//
	// receiver_uid
	// from
	// number
	//

	var _receiver_uid = parseInt(req.query.receiver_uid);
	var _from = parseInt(req.query.from, 10);
	var _number = parseInt(req.query.number, 10);

	notifications
		.sync({
			force: false
		})
		.then(function() {
			return notifications.findAll({
				where: {
					receiver_uid: _receiver_uid
				},
				order: [
					['nid', 'DESC']
				],
				offset: _from,
				limit: _number
			});
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.json(err);
		});

});

// For TESTING!
router.post('/', function(req, res, next) {

	var _receiver_uid = parseInt(req.body.receiver_uid);
	var _trigger_reason = req.body.trigger_reason;
	var _content = req.body.content;

	notifications
		.sync({
			force: false
		})
		.then(function() {
			return notifications.create({
				receiver_uid: _receiver_uid,
				trigger_reason: _trigger_reason,
				content: _content
			});
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.json(err);
		});

});

module.exports = router;
