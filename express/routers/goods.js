var express = require('express');
var router  = express.Router();

// Including tables
var goods    = require('../ORM/Goods');
var users    = require('../ORM/Users');
var comments = require('../ORM/Comments');

// Get a good by given goods_gid
// Or get goods by given owner_uid
router.get('/', function(req, res, next) {

	// Available query params:
	//
	// gid
	// owner_uid
	//

	// Get property:value in ?x=y&z=w....
	var _gid       = parseInt(req.query.gid);
	var _owner_uid = parseInt(req.query.owner_uid);

	// If gid or owner_uid in query are not defined, then set them to zero or emptyString
	if (!_gid > 0) {
		_gid = 0;
	}

	if (_owner_uid === undefined) {
		_owner_uid = "";
	}

	if (!_owner_uid.length > 0) {
		_owner_uid = "";
	}

	// If gid or owner_uid appear together, then return empty json
	// Because we want RESTful looking for either the gid of one good or one owner's goods
	if (_gid > 0 && _owner_uid !== "") {
		res.json({});
	}

	// Set association between tables (users, goods) and (goods, comments)
	users.hasMany(goods, {foreignKey: 'owner_uid'});
	goods.belongsTo(users, {foreignKey: 'owner_uid'});
	goods.hasMany(comments, {foreignKey: 'goods_gid'});
	comments.belongsTo(goods, {foreignKey: 'goods_gid'});

	// Emit a find operation with orm model in table `goods`
	goods
		.sync({force: false})
		.then(function() {

			/*
			 * SELECT `goods`. * , `users`.*, `comments`.*
			 *   FROM `goods`, `users`, `comments`
			 *  WHERE `goods`.`gid` = '_gid'
			 *    AND `goods`.`owner_uid` = `users`.`uid`
			 *    AND `goods`.`owner_uid` = `comments`.`commenter_uid`
			 */

			return goods.findAll({
				where: {
					$or: [{
						gid: _gid
					}, {
						owner_uid: _owner_uid
					}]
				},
				include: [users, comments]
			});
		})
		.then(function(result) {
			res.json(result);
		})
		.catch(function(err) {
			res.json({});
		});
});

// Post a good
router.post('/post', function(req, res, next) {

	// Necessary POST body params:
    //
    // name
    // category
    // description
    // position_x
    // position_y
    // owner_uid
    //

    // Get property:value in POST body
    var _name        = req.body.name;
    var _category    = req.body.category;
    var _description = req.body.description || '';
    var _position_x  = parseFloat(req.body.position_x);
    var _position_y  = parseFloat(req.body.position_y);
    var _owner_uid   = parseInt(req.body.owner_uid);

    // Create instance
    goods
    	.sync({force: false})
    	.then(function() {
	        return goods.create({
	            name       : _name,
	            category   : _category,
	            description: _description,
	            position_x : _position_x,
	            position_y : _position_y,
	            owner_uid  : _owner_uid
	        });
    	})
	    .then(function(result) {
	       res.json(result);
	   })
	   .catch(function(err) {
		   res.json({});
	   });

});

// Edit a good
router.put('/edit', function(req, res, next) {

	// Necessary PUT body params:
	//
	// gid
	// name
	// category
	// description
	// position_x
	// position_y
	//

	// Get property:value in PUT body
	var _gid         = parseInt(req.body.gid);
	var _name        = req.body.name;
	var _category    = req.body.category;
	var _description = req.body.description || '';
	var _position_x  = parseFloat(req.body.position_x);
	var _position_y  = parseFloat(req.body.position_y);


	// Find the good which got right gid and update values
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
				result.name        = _name;
				result.category    = _category;
				result.description = _description;
				result.position_x  = _position_x;
				result.position_y  = _position_y;
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

// Delete a good (but not really delete it)
router.put('/delete', function(req, res, next) {

	// Necessary PUT body params:
	//
	// gid
	//

	// Get property:value in PUT body
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
