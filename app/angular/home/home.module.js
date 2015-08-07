"use strict";

const angular = require('angular');
const bulk    = require('bulk-require');

module.exports = angular.module('app.home',
	[
		'app.core',
	]
);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);