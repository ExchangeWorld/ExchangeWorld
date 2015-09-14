'use strict';

const angular = require('angular');
const bulk    = require('bulk-require');

require('angular-base64-upload');
module.exports = angular.module('app.post',
	[
		'app.core',
		'naif.base64',
	]
);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
