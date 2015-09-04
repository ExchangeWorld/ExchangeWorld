var express = require('express');
var router  = express.Router();

// Including tables
var messages = require('../ORM/Messages');
var users    = require('../ORM/Users');

router.get('/', function(req, res, next) {

	// Available GET params:
	//
	// receiver_uid
	// sender_uid
	// from
	// number
	//

	var _receiver_uid = parseInt(req.query.receiver_uid, 10);
	var _sender_uid   = parseInt(req.query.sender_uid, 10);
	var _from         = parseInt(req.query.from, 10);
	var _number       = parseInt(req.query.number, 10);

	messages.belongsTo(users, {foreignKey: 'sender_uid'});

	messages
		.sync({
			force: false
		})
		.then(function() {
			return messages.findAll({
				where: {
					receiver_uid: _receiver_uid
				},
				order: [
					['mid', 'DESC']
				],
				include:[users],
				offset: _from,
				limit: _number
			});
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.send(err);
		});

});

router.post('/', function(req, res, next) {

	var _receiver_uid = parseInt(req.body.receiver_uid, 10);
	var _sender_uid   = parseInt(req.body.sender_uid, 10);
	var _content      = req.body.content;

	messages
		.sync({
			force: false
		})
		.then(function() {
			return messages.create({
				receiver_uid : _receiver_uid,
				sender_uid   : _sender_uid,
				content      : _content
			});
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.send(err);
		});

});

module.exports = router;
