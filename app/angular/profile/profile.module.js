'use strict';

const angular = require('angular');
const bulk    = require('bulk-require');

require('angular-sanitize');
module.exports = angular.module('app.profile',
	[
		'app.core',
		'ngStorage',
		'ngSanitize',
	]
);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
