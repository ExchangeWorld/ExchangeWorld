var express = require('express');
var router = express.Router();

// Including tables
var users         = require('../ORM/Users');
var tokens        = require('../ORM/Tokens.js');
var star          = require('../ORM/Stars.js');
var queue         = require('../ORM/Queues.js');
var goods         = require('../ORM/Goods.js');
var following     = require('../ORM/Followings.js');
var follower      = require('../ORM/Followers.js');
var exchange      = require('../ORM/Exchanges.js');
var comment       = require('../ORM/Comments.js');
var message       = require('../ORM/Messages.js');
var notifications = require('../ORM/Notifications.js');
var chatroom      = require('../ORM/Chatrooms.js');
var auths         = require('../ORM/Auths.js');

router.get('/', function(req, res, next) {
	users.sync({ force: false });
	tokens.sync({ force: false });
	star.sync({ force: false });
	queue.sync({ force: false });
	goods.sync({ force: false });
	following.sync({ force: false });
	follower.sync({ force: false });
	exchange.sync({ force: false });
	comment.sync({ force: false });
	tokens.sync({ force: false });
	message.sync({ force: false });
	notifications.sync({ force:false });
	chatroom.sync({force: false});
	auths.sync({force: false});

	res.send({message: 'success.'});
});
module.exports = router;
