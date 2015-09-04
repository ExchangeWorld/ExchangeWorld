'use strict';

const angular  = require('angular');
const bulk     = require('bulk-require');
global._       = require("lodash"); //fix restangular dependency on lodash issue

require('angular-base64-upload');
require('angularjs-facebook');
require('angular-material');
require('angular-ui-router');
require('restangular');
require('ngstorage');
require('../utils/exception/exception.module');
require('../utils/fackbook/facebook.module');
require('../utils/notification/notification.module');
require('../utils/message/message.module');
require('../utils/logger/logger.module');
require('../utils/router/router.module');
require('../utils/resize/resize.module');
require('../utils/auth/auth.module');

const requires = [
	'ui.router',
	'ngStorage',
	'restangular',
	'ngMaterial',
	'naif.base64',
	'utils.facebook',
	'utils.notification',
	'utils.message',
	'utils.logger',
	'utils.exception',
	'utils.router',
	'utils.resize',
	'utils.auth',
];

module.exports = angular.module('app.core', requires);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
