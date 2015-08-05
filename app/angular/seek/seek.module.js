"use strict";

const angular = require('angular');
const bulk    = require('bulk-require');

require('restangular');
module.exports = angular.module('app.seek',
	[
		'app.core',
		'restangular'
	]
);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
