'use strict';

require('angular').module(
  'joegarb',
  [
    'ngRoute', 'angularCSS',
    'joegarb.controllers', 'joegarb.directives', 'joegarb.filters'
  ],
  ['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider.when(
        '/resume',
        {
          templateUrl: 'components/resume/resume.html',
          controller: 'ResumeController',
          css: 'components/resume/resume.css'
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

require('./components');
require('./shared');
