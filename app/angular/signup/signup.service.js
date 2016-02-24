'use strict';

const signupModule = require('./signup.module');

signupModule.service('signupService', signupService);

/** @ngInject */
function signupService(Restangular, $q, facebookService, exception) {

}
