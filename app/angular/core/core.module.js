'use strict';

const angular  = require('angular');
const bulk     = require('bulk-require');
global._       = require("lodash"); //fix restangular dependency on lodash issue

require('angular-ui-router');
require('restangular');
require('angular-material');
require('../utils/logger/logger.module');
require('../utils/exception/exception.module');
require('../utils/router/router.module');

const requires = [
	'ui.router',
	'restangular',
	'ngMaterial',
	'utils.logger',
	'utils.exception',
	'utils.router',
];

module.exports = angular.module('app.core', requires);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
