"use strict";

const angular = require('angular');
const bulk    = require('bulk-require');

require('ngmap');
require('angular-sanitize');
module.exports = angular.module('app.goods',
	[
		'app.core',
		'ngMap',
		'ngSanitize',
	]
);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);