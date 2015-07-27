'use strict';

const angular  = require('angular');
const bulk     = require('bulk-require');

require('angular-ui-router');
require('angular-material');
require('../utils/logger/logger.module');
require('../utils/exception/exception.module');
require('../utils/router/router.module');

const requires = [
	'ui.router',
	'ngMaterial',
	'utils.logger',
	'utils.exception',
	'utils.router',
];

module.exports = angular.module('app.core', requires);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);