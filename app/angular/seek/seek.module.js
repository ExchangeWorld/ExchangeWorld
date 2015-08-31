"use strict";

const angular = require('angular');
const bulk    = require('bulk-require');

require('../utils/deckgrid/angular-deckgrid');
module.exports = angular.module('app.seek',
	[
		'app.core',
		'akoenig.deckgrid',
	]
);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
