"use strict";

const angular  = require('angular');
const bulk     = require('bulk-require');
console.log('router.module.js');

require('../logger/logger.module');
module.exports = angular.module('utils.router', ['utils.logger']);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);