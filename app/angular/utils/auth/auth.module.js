"use strict";

const angular  = require('angular');
const bulk     = require('bulk-require');

module.exports = angular.module('utils.auth', ['utils.facebook', 'ngStorage']);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
