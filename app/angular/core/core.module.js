'use strict';

const angular  = require('angular');
const bulk     = require('bulk-require');
global._       = require("lodash"); //fix restangular dependency on lodash issue

require('angular-touch');
require('angular-material');
require('angular-ui-router');
require('restangular');
require('ngstorage');
require('../utils/photoSlider/photoSlider.module');
require('../utils/exception/exception.module');
require('../utils/fackbook/facebook.module');
require('../utils/notification/notification.module');
require('../utils/message/message.module');
require('../utils/favorite/favorite.module');
require('../utils/logger/logger.module');
require('../utils/router/router.module');
require('../utils/resize/resize.module');
require('../utils/auth/auth.module');
require('../utils/scroll/scroll.module');

const requires = [
	'ui.router',
	'ngStorage',
	'restangular',
	'ngTouch',
	'ngMaterial',
	'utils.photoSlider',
	'utils.scroll',
	'utils.facebook',
	'utils.favorite',
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
