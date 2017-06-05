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
        '/cv',
        {
          templateUrl: 'components/cv/cv.html',
          controller: 'CvController',
          css: 'components/cv/cv.css'
        }
      );

      // In case anyone has the outdated resume link, redirect it to cv
      $routeProvider.when(
        '/resume',
        {
          redirectTo: '/cv'
        }
      );

      // Redirect all requests to the cv page until we have a proper home page
      $routeProvider.otherwise(
        {
          redirectTo: '/cv'
        }
      );

      $locationProvider.html5Mode(true);
    }]
);

require('angular-route');
require('angular-css');

require('./components');
require('./shared');
