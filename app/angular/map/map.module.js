"use strict";

const angular = require('angular');
const bulk    = require('bulk-require');

require('ngmap');
require('../utils/ripple/ripple.module')
module.exports = angular.module('app.map',
	[
		'app.core',
		'utils.ripple',
		'ngMap',
	]
);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);