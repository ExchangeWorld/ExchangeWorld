/*global angular */

"use strict";


describe('Unit: GoodsService', function() {

	var service;

	beforeEach(function() {
		// instantiate the app module
		angular.mock.module('app.goods');

		angular.mock.inject(function(goodsService) {
			service = goodsService;
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

