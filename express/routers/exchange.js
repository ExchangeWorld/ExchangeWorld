var express = require('express');
var router  = express.Router();

// Including tables
var exchanges = require('../ORM/Exchanges');
var chatrooms = require('../ORM/Chatrooms') 
var users     = require('../ORM/Users.js');
var goods     = require('../ORM/Goods.js');

// These routes are really dangerous
// Only use them when you know what are you doing

router.get('/allExchange', function(req, res, next) {

	// Set association between tables (users, goods) 
	users.hasMany(goods, {foreignKey: 'owner_uid'});
	goods.belongsTo(users, {foreignKey: 'owner_uid'});

	exchanges
		.sync({force: false})
		.then(function() {
			return exchanges.findAll({
				where: {
					status :'initiated'
				}
			});
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.send({error: err});
		});

});

router.get('/of', function(req, res, next) {

	var _owner_uid = req.query.owner_uid;

	goods
		.findAll({
			where: {
				owner_uid: _owner_uid,
				status: 0,
				deleted: 0
			}
		})
		.then(function(_goods) {
			return exchanges.findAll({
				where: {
					$and: [{
						$or: [{
							goods1_gid: _goods.gid
						}, {
							goods2_gid: _goods.gid
						}]
					}, {
						status: 'initiated'
					}]
				}
			});
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.send({error: err});
		});
});

router.get('/', function(req, res, next) {

	// Available query params
	// 
	// eid
	// 

	var _eid = parseInt(req.query.eid, 10);

	// Set association between tables (users, goods) 
	users.hasMany(goods, {foreignKey: 'owner_uid'});
	goods.belongsTo(users, {foreignKey: 'owner_uid'});

	exchanges
		.sync({force: false})
		.then(function() {
			return exchanges.findAll({
				where: {
					$and:[{
						eid: _eid,
						status :'initiated'
					}]
				}
			});
		})
		.then(function(result) {
			console.log(result);
			goods
				.sync({force: false})
				.then(function() {
					return goods.findAll({
						where: {
							$or: [{
								gid: result[0].dataValues.goods1_gid 
							}, {
								gid: result[0].dataValues.goods2_gid 
							}]
						},
						include: [users]
					});
				})
				.then(function(goods) {
					result[0].dataValues.goods = goods;
					res.json(result);
				})
				.catch(function(err) {
					res.send([{error: err}]);
				});
		})
		.catch(function(err) {
			res.send([{error: err}]);
		});

});

// Create a new exchange
// Default status of an exchange is 'initiated'
router.post('/create', function(req, res, next) {

	// Available POST body params:
	//
	// goods1_gid (smaller goods_gid)
	// goods2_gid (larger goods_gid)
	//

	// Get property:value in POST body
	var __goods1_gid = parseInt(req.body.goods1_gid, 10);
	var __goods2_gid = parseInt(req.body.goods2_gid, 10);

	// And make sure goods1_gid < goods2_gid
	var _goods1_gid = Math.min(__goods1_gid, __goods2_gid);
	var _goods2_gid = Math.max(__goods1_gid, __goods2_gid);

	// Create instance
	// If there is already a pair (goods1_gid, goods2_gid) then do nothing
	exchanges
		.sync({
			force: false
		})
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
				res.json(isThereAlready);
			} else {

				chatrooms
					.sync({
						force: false
					})
					.then(function() {
						return chatrooms.create({
							members: ''
						});
					})
					.then(function(the_chatroom) {
						return exchanges.create({
							goods1_gid: _goods1_gid,
							goods2_gid: _goods2_gid,
							chatroom_cid: the_chatroom.cid
						});
					})
					.then(function(result) {
						res.json(result);
					});
			}
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
	var __goods1_gid = parseInt(req.body.goods1_gid, 10);
	var __goods2_gid = parseInt(req.body.goods2_gid, 10);

	// And make sure goods1_gid < goods2_gid
	var _goods1_gid = Math.min(__goods1_gid, __goods2_gid);
	var _goods2_gid = Math.max(__goods1_gid, __goods2_gid);

	// First, any exchanges with goods1_gid and goods2_gid, \
	// their status will be set to 'dropped'.
	// Find instance and update its status to 'completed' then save
	exchanges
		.sync({force: false})
		.then(function() {
			return exchanges.update(
			{status: 'dropped'}, 
			{where: {
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
					goods1_gid: _goods1_gid,
					goods2_gid: _goods2_gid
				}
			});
		})
		.then(function(result) {
			if (result == null) {
				return {};
			} else {
				if (result.goods1_agree == false || result.goods2_agree == false) {
					return {};
				}
				result.status = 'completed';
				result.save().then(function() {});
				return result;
			}
		})
		.then(function(result) {
			res.json(result);
			return result;
		}, function(err) {
			res.send({error: err});
		})
		.then(function(result) {
			if (result != {}) {
				goods.findOne({
					where: {
						gid: result.goods1_gid
					}
				})
				.then(function(goods1) {
					goods1.status = 1;
					goods1.save().then(function() {});
				})
			}
			return result;
		})
		.then(function(result) {
			if (result != {}) {
				goods.findOne({
					where: {
						gid: result.goods2_gid
					}
				})
				.then(function(goods2) {
					goods2.status = 1;
					goods2.save().then(function() {});
				})
			}
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
	var __goods1_gid = parseInt(req.body.goods1_gid, 10);
	var __goods2_gid = parseInt(req.body.goods2_gid, 10);

	// And make sure goods1_gid < goods2_gid
	var _goods1_gid = Math.min(__goods1_gid, __goods2_gid);
	var _goods2_gid = Math.max(__goods1_gid, __goods2_gid);

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

// Change the agreement status of goods in the exchange
router.put('/agree', function(req, res, next) {

	// Available body params
	// 
	// eid
	// goods_gid
	// agree (true or false)
	//
	var _eid       = parseInt(req.body.eid, 10);
	var _goods_gid = parseInt(req.body.goods_gid, 10);
	var _agree     = (req.body.agree == 'true' || req.body.agree == true ? true : false);

	exchanges
		.sync({
			force: false
		})
		.then(function() {
			return exchanges.findOne({
				where: {
					$and: [{
						eid   : _eid,
						status: 'initiated'
					}]
				}
			});
		})
		.then(function(result) {
			if (result == null) {
				return {};
			} else {
				if (result.goods1_gid == _goods_gid) {
					result.goods1_agree = _agree;
					result.save().then(function() {});
					return result;
				} else if (result.goods2_gid == _goods_gid) {
					result.goods2_agree = _agree;
					result.save().then(function() {});
					return result;
				} else {
					return {};
				}
			}
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.send({
				error: err
			});
		});

});



module.exports = router;
