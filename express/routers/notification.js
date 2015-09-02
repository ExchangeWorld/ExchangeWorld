var express = require('express');
var router = express.Router();

// Including tables
var notifications = require('../ORM/Notifications');
var users         = require('../ORM/Users');

router.get('/belongsTo', function(req, res, next) {

	// Available GET params:
	//
	// receiver_uid
	// from
	// number
	//

	var _receiver_uid = parseInt(req.query.receiver_uid, 10);
	var _from         = parseInt(req.query.from, 10);
	var _number       = parseInt(req.query.number, 10);

	notifications.belongsTo(users, {foreignKey: 'sender_uid'});

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
				include: [users],
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

router.get('/', function(req, res, next) {

	// Available GET params:
	//
	// nid
	//

	var _nid = parseInt(req.query.nid, 10);

	notifications
		.sync({
			force: false
		})
		.then(function() {
			return notifications.findAll({
				where: {
					nid: _nid
				},
			});
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.json(err);
		});

});

router.post('/', function(req, res, next) {

	var _sender_uid   = parseInt(req.body.sender_uid);
	var _receiver_uid = parseInt(req.body.receiver_uid);
	var _trigger      = req.body.trigger;
	var _content      = req.body.content;

	notifications
		.sync({
			force: false
		})
		.then(function() {
			return notifications.create({
				sender_uid   : _sender_uid,
				receiver_uid : _receiver_uid,
				trigger      : _trigger,
				content      : _content
			});
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.json(err);
		});

});

/**
 * use to update read/unread
 */
router.put('/', function(req, res, next) {

	// Available PUT body params:
	//
	// nid
	// unread
	//

	// Get property:value in PUT body
	var _nid    = parseInt(req.body.nid, 10);
	var _unread = Boolean(req.body.unread);

	notifications
		.sync({force: false})
		.then(function() {
			return notifications.update(
			{unread: _unread}, 
			{where: {
					nid: _nid
				}
			})
			.then(function() {});
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.send({error: err});
		});
});

module.exports = router;
