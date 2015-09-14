'use strict';

const angular = require('angular');
const bulk    = require('bulk-require');

module.exports = angular.module('app.profile',
	[
		'app.core',
		'ngStorage'
	]
);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
