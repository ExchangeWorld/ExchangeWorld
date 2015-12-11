'use strict';

const layoutModule = require('./layout.module');

layoutModule.controller('layoutController', layoutController);

/** @ngInject */
function layoutController($state, $rootScope, $window) {
	console.log('fk');
}
