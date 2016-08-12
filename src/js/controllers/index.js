'use strict';

var app = require('angular').module('joegarb.controllers', ['ngRoute']);

app.controller('HeaderController', require('./header-controller.js'));
app.controller('ResumeController', require('./resume-controller.js'));

app.run(function($rootScope) {
  // A place for global constants, etc
});