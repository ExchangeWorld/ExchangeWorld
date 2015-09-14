'use strict';

const angular = require('angular');
const bulk    = require('bulk-require');
require('../utils/fill/fill.js');

module.exports = angular.module('app.exchange',
	[
		'app.core',
		'fillHeight',
	]
);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
