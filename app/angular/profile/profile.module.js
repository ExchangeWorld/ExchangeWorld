'use strict';

const angular = require('angular');
const bulk    = require('bulk-require');

require('ng-img-crop-npm');
require('angular-sanitize');
module.exports = angular.module('app.profile',
	[
		'app.core',
		'ngStorage',
		'ngSanitize',
		'naif.base64',
		'ngImgCrop',
	]
);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
