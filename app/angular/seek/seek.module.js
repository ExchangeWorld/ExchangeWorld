"use strict";

const angular = require('angular');
const bulk    = require('bulk-require');

module.exports = angular.module('app.seek',
	[
		'app.core',
	]
);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
