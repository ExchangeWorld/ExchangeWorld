"use strict";

const angular  = require('angular');
const bulk     = require('bulk-require');
console.log('logger.module.js');

require('angular-toastr');
module.exports = angular.module('utils.logger', ['ngAnimate', 'toastr']);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);