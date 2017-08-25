'use strict';

var app = require('angular').module('joegarb.controllers', ['ngRoute']);

app.controller(
    'HeaderController',
    ['$scope', '$window', '$location', require('./header/header.js')]
);

app.controller(
    'CvController',
    ['$scope', '$routeParams', require('./cv/cv.js')]
);
