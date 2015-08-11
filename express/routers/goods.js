var express = require('express');
var router  = express.Router();

// including tables
var goods    = require('../ORM/Goods');
var user     = require('../ORM/User');
var comments = require('../ORM/Comments');

router.get('/', function(req, res, next) {

	// Available params:
	//
	// gid
	// ownerID
	//

	// Get property:value in ?x=y&z=w....
	var _gid     = parseInt(req.query.gid);
	var _ownerID = req.query.ownerID;

	// If gid or ownerID in query are not defined, then set them to zero or emptyString
	if (!_gid > 0) {
		_gid = 0;
	}

	if (_ownerID === undefined) {
		_ownerID = "";
	}

	if (!_ownerID.length > 0) {
		_ownerID = "";
	}

	// If gid or ownerID appear together, then return undefined
	// Because we want RESTful looking for either the gid of one good or one owner's goods
	if (_gid > 0 && _ownerID !== "") {
		res.json(undefined);
	}

	// Set association between tables (user, goods)
	user.hasMany(goods, {foreignKey: 'ownerID'});
	goods.belongsTo(user, {foreignKey: 'ownerID'});
	goods.hasMany(comments, {foreignKey: 'goods_id'});
	comments.belongsTo(goods, {foreignKey: 'goods_id'});

	// Emit a find operation with orm model in table `goods`
	goods
		.sync({force: false})
		.then(function() {

			/*
			 * SELECT `goods`. * , `user`.*, `comments`.*
			 * FROM `goods`, `user`, `comments`
			 * WHERE `goods`.`gid` = '_gid'
			 *   AND `goods`.`ownerID` = `user`.`fb_id`
			 *   AND `goods`.`ownerID` = `comments`.`commenter`
			 */

			return goods.findAll({
				where: {
					$or: [{
						gid: _gid
					}, {
						ownerID: _ownerID
					}]
				},
				include: [user, comments]
			});
		})
		.then(function(result) {
			res.json(result);
		});
});

router.get('/edit', function(req, res, next) {

	// Necessary params:
	//
	// gid
	// gname
	// categories
	// description
	// posX
	// posY
	// 

	var _gid = parseInt(req.query.gid);
	var _gname = req.query.gname;
	var _categories = req.query.categories;
	var _description = req.query.description;
	var _want = ''; // But will be deprecated soon
	var _posX = parseFloat(req.query.posX);
	var _posY = parseFloat(req.query.posY);

	goods
		.sync({
			force: false
		})
		.then(function() {
			return goods.findOne({
				where: {
					gid: _gid
				}
			});
		})
		.then(function(result) {
			if (result == null) {
				return {};
			} else {
				result.gname       = _gname;
				result.categories  = _categories;
				result.description = _description;
				result.want        = _want;
				result.posX        = _posX;
				result.posY        = _posY;
				result.save().then(function() {});
				return result;
			}
		})
		.then(function(result) {
			res.json(result);
		});
});

router.get('/delete', function(req, res, next) {

	// Necessary params:
	//
	// gid
	//

	var _gid = parseInt(req.query.gid);

	goods
		.sync({force: false})
		.then(function() {
			return goods.findOne({
				where: {
					gid: _gid
				}
			});
		})
		.then(function(result) {
			if (result == null) {
				return {};
			} else {
				result.deleted = 1;
				result.save().then(function() {});
				return result;
			}
		})
		.then(function(result) {
			res.json(result);
		});
});

module.exports = router;
