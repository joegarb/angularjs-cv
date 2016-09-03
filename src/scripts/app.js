'use strict';

/* eslint max-len: "off" */

require('angular').module(
  'joegarb',
  ['ngRoute', 'angularCSS', 'joegarb.controllers', 'joegarb.directives', 'joegarb.filters'],
  ['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.when(
      '/resume',
      {
        templateUrl: 'templates/resume.html',
        controller: 'ResumeController',
        css: 'styles/specific/resume.css'
      }
    );

    // Redirect all requests to the resume page
    $routeProvider.otherwise(
      {
        redirectTo: '/resume'
      }
    );

    $locationProvider.html5Mode(true);
  }]
);

require('angular-route');
require('angular-css');

require('./controllers');
require('./directives');
require('./filters');
