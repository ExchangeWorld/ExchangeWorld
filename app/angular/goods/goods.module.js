"use strict";

const angular = require('angular');
const bulk    = require('bulk-require');

require('ngmap');
module.exports = angular.module('app.goods',
	[
		'app.core',
		'ngMap',
	]
);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);