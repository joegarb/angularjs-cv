angular.module('joegarb.directives', [])

// Force a reload when clicking a link that points to the current page (without this the page wouldn't reload, nothing would happen)
  .directive('jgHref', ['$location', '$route',
    function($location, $route) {
      return function(scope, element, attrs) {
        scope.$watch('jgHref', function() {
          if(attrs.jgHref) {
            element.attr('href', attrs.jgHref);
            element.bind('click', function(event) {
              scope.$apply(function(){
                if($location.path() === attrs.jgHref) {
                  $route.reload();
                }
              });
            });
          }
        });
      }
    }]
  )

;