var express = require('express');
var router  = express.Router();

// Including tables
var comments = require('../ORM/Comments');

// Get comments of a goods
router.get('/of/goods', function(req, res, next) {

	// Available query params
	// 
	// goods_gid
	// 

	var _goods_gid = parseInt(req.query.goods_gid, 10);

	comments
		.sync({force: false})
		.then(function() {
			return comments.findAll({
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

// Get Comments of a user
router.get('/of/user', function(req, res, next) {
	
	// Available query params
	// 
	// commenter_uid
	// 

	var _commenter_uid = parseInt(req.query.commenter_uid, 10);

	comments
		.sync({force: false})
		.then(function() {
			return comments.findAll({
				where: {
					commenter_uid: _commenter_uid
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

// Post a comment to a goods
router.post('/post', function(req, res, next) {

	// Necessary POST body params
	// 
	// goods_gid
	// commenter_uid
	// 

	var _goods_gid     = parseInt(req.body.goods_gid, 10);
	var _commenter_uid = parseInt(req.body.commenter_uid, 10);
	var _content       = req.body.content;

	comments
		.sync({force: false})
		.then(function() {
			return comments.create({
				goods_gid: _goods_gid,
				commenter_uid: _commenter_uid,
				content: _content
			});
		})
		.then(function(result) {
			if (result == null) {
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

// Edit a comment
router.put('/edit', function(req, res, next) {

	// Necessary PUT body params
	// 
	// cid
	// content
	// 

	var _cid     = parseInt(req.body.cid, 10);
	var _content = req.body.content;

	comments
		.sync({force: false})
		.then(function() {
			return comments.findOne({
				where: {
					cid: _cid
				}
			});
		})
		.then(function(result) {
			result.content = _content;
			result.save().then(function() {});
			return result;
		})
		.then(function(result) {
			if (result == null) {
				res.json(null);
			}
			else {
				res.json(result);
			}
		})
		.catch(function(err) {
			res.json(err);
		});
});

// Delete a comment
router.put('/delete', function(req, res, next) {

	// Necessary DELETE body params
	// 
	// cid
	//

	var _cid = parseInt(req.body.cid, 10);

	comments
		.sync({force: false})
		.then(function() {
			return comments.destroy({
				where: {
					cid: _cid
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
