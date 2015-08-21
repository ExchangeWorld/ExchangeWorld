"use strict";

const angular  = require('angular');
const bulk     = require('bulk-require');

module.exports = angular.module('utils.facebook', ['facebook', 'ngStorage']);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);
