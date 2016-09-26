'use strict';

var app = require('angular').module('joegarb.controllers', ['ngRoute']);

app.controller(
  'HeaderController',
  ['$scope', '$window', '$location', require('./header/header-controller.js')]
);

app.controller(
  'ResumeController',
  ['$scope', '$routeParams', require('./resume/resume-controller.js')]
);
