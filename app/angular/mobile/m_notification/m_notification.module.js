'use strict';

const angular = require('angular');
const bulk    = require('bulk-require');

module.exports = angular.module('m.notification',
	[
		'app.core',
	]
);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
