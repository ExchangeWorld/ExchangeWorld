'use strict';

const exampleModule = require('./example.module');
exampleModule.controller('ExampleCtrl', ExampleCtrl);

/** @ngInject */
function ExampleCtrl() {

	// ViewModel
	const vm = this;

	vm.title  = 'AngularJS, Gulp, and Browserify!';
	vm.number = 1234;

}