var express = require('express');
var router  = express.Router();

// Including tables
var comments = require('../ORM/Comments');
var users    = require('../ORM/Users');

// Get comments of a goods
router.get('/of/goods', function(req, res, next) {

	// Available query params
	// 
	// goods_gid
	// 

	var _goods_gid = parseInt(req.query.goods_gid, 10);

	users.hasMany(comments, {foreignKey: 'commenter_uid'});
	comments.belongsTo(users, {foreignKey: 'commenter_uid'});

	comments
		.sync({force: false})
		.then(function() {
			return comments.findAll({
				where: {
					goods_gid: _goods_gid
				},
				order : 'cid ASC',
				include: [users]
			});
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.send({error: err});
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
			res.json(result);
		})
		.catch(function(err) {
			res.send({error: err});
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
			} else {
				res.json(result);
			}
		})
		.catch(function(err) {
			res.send({error: err});
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
			} else {
				res.json(result);
			}
		})
		.catch(function(err) {
			res.send({error: err});
			//res.send({error:err});
		});
});

// Delete a comment
router.delete('/delete', function(req, res, next) {

	// Necessary DELETE query params
	// 
	// cid
	//

	var _cid = parseInt(req.query.cid, 10);

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
			res.send({error: err});
		});
});

module.exports = router;
