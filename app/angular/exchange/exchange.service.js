'use strict';

const exchangeModule = require('./exchange.module');
const _             = require('lodash');

exchangeModule.service('exchangeService', exchangeService);

/** @ngInject */
function exchangeService(Restangular, $q) {
}
