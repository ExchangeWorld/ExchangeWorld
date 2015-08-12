var express = require('express');
var router  = express.Router();

// Including tables
var exchanges = require('../ORM/Exchanges');

// These routes are really dangerous
// Only use them when you know what are you doing

// Create a new exchange
// Default status of an exchange is 'initiated'
router.post('/create', function(req, res, next) {

	// Available POST body params:
	//
	// goods1_gid (smaller goods_gid)
	// goods2_gid (larger goods_gid)
	//

	// Get property:value in POST body
	var __goods1_gid = parseInt(req.body.goods1_gid);
	var __goods2_gid = parseInt(req.body.goods2_gid);

	// And make sure goods1_gid < goods2_gid
	var _goods1_gid = (__goods1_gid < __goods2_gid ? __goods1_gid : __goods2_gid);
	var _goods2_gid = (__goods2_gid > __goods1_gid ? __goods2_gid : __goods1_gid);

	// Create instance
	// If there is already a pair (goods1_gid, goods2_gid) then do nothing
	exchanges
		.sync({force: false})
		.then(function() {
			return exchanges.findOne({
				where: {
					$and: [{
						goods1_gid: _goods1_gid
					}, {
						goods2_gid: _goods2_gid
					}]
				}
			});
		})
		.then(function(isThereAlready) {
			if (isThereAlready != null) {
				return isThereAlready;
			} else {
				return exchanges.create({
					goods1_gid: _goods1_gid,
					goods2_gid: _goods2_gid
				});
			}
		})
		.then(function(result) {
			res.json(result);
		});
});

// Complete an exchagne
// Set the status of an exchange to completed
// And **WHEN COMPLETED** any other exchanges contain either goods1_gid or goods2_gid \
// Must become 'dropped'
router.put('/complete', function(req, res, next) {

	// Available PUT body params:
	//
	// goods1_gid (smaller goods_gid)
	// goods2_gid (larger goods_gid)
	//

	// Get property:value in PUT body
	var __goods1_gid = parseInt(req.body.goods1_gid);
	var __goods2_gid = parseInt(req.body.goods2_gid);

	// And make sure goods1_gid < goods2_gid
	var _goods1_gid = (__goods1_gid < __goods2_gid ? __goods1_gid : __goods2_gid);
	var _goods2_gid = (__goods2_gid > __goods1_gid ? __goods2_gid : __goods1_gid);

	// First, any exchanges with goods1_gid and goods2_gid, \
	// their status will be set to 'dropped'.
	// Find instance and update its status to 'completed' then save
	exchanges
		.sync({force: false})
		.then(function() {
			return exchanges.update({
				status: 'dropped'}, {
				where: {
					$or: [{
						goods1_gid: _goods1_gid
					}, {
						goods2_gid: _goods2_gid
					}]
				}
			})
			.then(function() {});
		})
		.then(function(tmp) {
			return exchanges.findOne({
				where: {
					$and: [{
						goods1_gid: _goods1_gid
					}, {
						goods2_gid: _goods2_gid
					}]
				}
			});
		})
		.then(function(result) {
			if (result == null) {
				return {};
			} else {
				result.status = 'completed';
				result.save().then(function() {});
				return result;
			}
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.json({});
		});
});

// Drop an exchange
// Set the status of an exchange to dropped
router.put('/drop', function(req, res, next) {

	// Available PUT body params:
	//
	// goods1_gid (smaller goods_gid)
	// goods2_gid (larger goods_gid)
	//

	// Get property:value in PUT body
	var __goods1_gid = parseInt(req.body.goods1_gid);
	var __goods2_gid = parseInt(req.body.goods2_gid);

	// And make sure goods1_gid < goods2_gid
	var _goods1_gid = (__goods1_gid < __goods2_gid ? __goods1_gid : __goods2_gid);
	var _goods2_gid = (__goods2_gid > __goods1_gid ? __goods2_gid : __goods1_gid);

	// Find instance and update its status to 'dropped' then save
	exchanges
		.sync({force: false})
		.then(function() {
			return exchanges.findOne({
				where: {
					$and: [{
						goods1_gid: _goods1_gid
					}, {
						goods2_gid: _goods2_gid
					}]
				}
			});
		})
		.then(function(result) {
			if (result == null) {
				return {};
			} else {
				result.status = 'dropped';
				result.save().then(function() {});
				return result;
			}
		})
		.then(function(result) {
			res.json(result);
		});
});

module.exports = router;
