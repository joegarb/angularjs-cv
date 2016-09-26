'use strict';

module.exports = function($sce) {
  return function(html) {
    return $sce.trustAsHtml(html);
  };
};
