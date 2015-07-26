"use strict";

const angular = require('angular');
const bulk    = require('bulk-require');
console.log('example.module.js');

module.exports = angular.module('app.example', []);

bulk(__dirname, ['./**/!(*.module|*.spec).js']);