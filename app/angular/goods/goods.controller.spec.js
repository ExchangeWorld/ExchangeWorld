/*global angular */

"use strict";


describe('Unit: GoodsController', function() {

	var controller;

	beforeEach(function() {
		// instantiate the app module
		angular.mock.module('app.goods');

		angular.mock.inject(function($controller) {
			controller = $controller('GoodsController', {});
		});
	});

	it('controller should exist', function() {
		expect(controller)
			.toBeDefined();
	});

	it('good data should be vaild object when state go to good', function() {
		// expect(ctrl.number).toEqual(1234);
	});

	it('should ', function() {
		// expect(ctrl.title).toEqual('AngularJS, Gulp, and Browserify!');
	});

});

// [{
// 	"gid": 33,
// 	"gname": "Deemo OST",
// 	"photoPath": "./images/database/ByHl5XYCUAAkmHK.jpg",
// 	"categories": "Music CD",
// 	"description": "dsadaddsafvxzvvvvvvv",
// 	"want": "Cytus Foresight OST",
// 	"posX": 121.574,
// 	"posY": 24.9887,
// 	"ownerID": "1006851545998566",
// 	"status": 0,
// 	"user": {
// 		"fb_id": "1006851545998566",
// 		"uid": 5,
// 		"username": "陳品嘉",
// 		"email": "test@gmail.com",
// 		"nickname": "thisisnickname",
// 		"photoPath": "https://scontent-tpe.xx.fbcdn.net/hprofile-xfp1/v/l/t1.0-1/s320x320/1920071_855872071096515_406318999718397443_n.jpg?oh=b821b3bd1a30069319d615d075952f03&oe=557A7811",
// 		"exchangeTable": 5,
// 		"followerTable": 5,
// 		"seekerTable": 5
// 	},
// 	"comments": [{
// 		"cid": 39,
// 		"goods_id": 33,
// 		"commenter": "611870928958311",
// 		"comment": " 喔 喔喔喔喔喔喔喔喔喔喔喔喔喔"
// 	}]
// }]
