'use strict';

const angular = require('angular');
const bulk    = require('bulk-require');
global._      = require("lodash"); //fix restangular dependency on lodash issue

require('babel-polyfill');
require('angular-material');
require('angular-ui-router');
require('restangular');
require('ngstorage');
require('angular-socialshare');
require('../utils/webSocket/socket.module');
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
require('../utils/colorThief/colorThief.module');
require('../utils/upwardScroll/upwardScroll.module');
require('../utils/scrollHide/scrollHide.module');
require('../mobile/m_message/m_message.module');
require('../mobile/m_messagebox/m_messagebox.module');
require('../mobile/m_notification/m_notification.module');
require('../mobile/m_exchange/m_exchange.module');

const requires = [
	'ui.router',
	'ngStorage',
	'restangular',
	'ngMaterial',
	'720kb.socialshare',
	'utils.socket',
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
	'utils.colorThief',
	'utils.upwardScroll',
	'utils.scrollHide',
	'm.message',
	'm.messagebox',
	'm.notification',
	'm.exchange',
];

module.exports = angular.module('app.core', requires);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
