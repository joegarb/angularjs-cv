'use strict';

var app = require('angular').module('joegarb.controllers', ['ngRoute']);

app.controller(
  'HeaderController',
  ['$scope', '$window', '$location', require('./header-controller.js')]
);
app.controller(
  'ResumeController',
  ['$scope', '$routeParams', require('./resume-controller.js')]
);

app.run(['$rootScope', function($rootScope) {
  // A place for global constants, etc
}]);
