'use strict';

const followModule = require('./follow.module');
const _             = require('lodash');

followModule.service('followService', followService);

/** @ngInject */
function followService(Restangular, $q) {
}
