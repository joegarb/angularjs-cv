'use strict';

module.exports = function($scope, $routeParams) {
  // Enable the pills (tabs) functionality
  $('.nav-pills a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
};