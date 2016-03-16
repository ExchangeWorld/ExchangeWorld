'use strict';

const m_exchangeModule = require('./m_exchange.module');
const _               = require('lodash');
m_exchangeModule.controller('m_exchangeController', m_exchangeController);

/** @ngInject */
function m_exchangeController(
	exchangeService,
	$state,
	$rootScope,
	$q,
	$stateParams,
	$timeout
) {
}
