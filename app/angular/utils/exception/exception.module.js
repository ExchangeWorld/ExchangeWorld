"use strict";

const angular  = require('angular');
const bulk     = require('bulk-require');
console.log('exception.module.js');

require('../logger/logger.module');
module.exports = angular.module('utils.exception', ['utils.logger']);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);