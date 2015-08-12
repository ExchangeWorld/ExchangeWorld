var express = require('express');
var router  = express.Router();

// Including tables
var stars = require('../ORM/Stars');

// Get users that star the goods
router.get('/to', function(req, res, next) {

	// Available query params
	// 
	// goods_gid
	// 

	var _goods_gid = req.query.goods_gid;

	stars
		.sync({force: false})
		.then(function() {
			return stars.findAll({
				where: {
					goods_gid: _goods_gid
				}
			});
		})
		.then(function(result) {
			if (result.length == 0) {
				res.json({});
			}
			else {
				res.json(result);
			}
		})
		.catch(function(err) {
			res.json({});
		});

});

// Get goods that user stars
router.get('/by', function(req, res, next) {

	// Available query params
	// 
	// starring_user_uid
	// 

	var _starring_user_uid = req.query.starring_user_uid;

	stars
		.sync({force: false})
		.then(function() {
			return stars.findAll({
				where: {
					starring_user_uid: _starring_user_uid
				}
			});
		})
		.then(function(result) {
			if (result.length == 0) {
				res.json({});
			}
			else {
				res.json(result);
			}
		})
		.catch(function(err) {
			res.json({});
		});

});

// Make a star to a goods
router.post('/post', function(req, res, next) {

	// Necessary POST body params
	// 
	// goods_gid
	// starring_user_uid
	// 

	var _goods_gid         = req.body.goods_gid;
	var _starring_user_uid = req.body.starring_user_uid;

	stars
		.sync({force: false})
		.then(function() {
			return stars.create({
				goods_gid: _goods_gid,
				starring_user_uid: _starring_user_uid
			});
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.json({});
		});

});

// Delete a star
router.put('/delete', function(req, res, next) {

	// Necessary DELETE body params
	// 
	// goods_gid
	// starring_user_uid
	// 

	var _goods_gid         = req.body.goods_gid;
	var _starring_user_uid = req.body.starring_user_uid;

	stars
		.sync({force: false})
		.then(function() {
			return stars.destroy({
				where: {
					goods_gid: _goods_gid,
					starring_user_uid: _starring_user_uid
				}
			});
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.json({});
		});
});

module.exports = router;
