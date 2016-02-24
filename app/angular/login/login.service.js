'use strict';

const loginModule = require('./login.module');

loginModule.service('loginService', loginService);

/** @ngInject */
function loginService(Restangular, $q, facebookService, exception) {

}
