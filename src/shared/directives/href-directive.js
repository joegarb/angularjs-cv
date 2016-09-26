'use strict';

module.exports = function($location, $route) {
  return function(scope, element, attrs) {
    scope.$watch('jgHref', function() {
      if (attrs.jgHref) {
        element.attr('href', attrs.jgHref);
        element.bind('click', function(event) {
          scope.$apply(function() {
            if ($location.path() === attrs.jgHref) {
              $route.reload();
            }
          });
        });
      }
    });
  };
};
