'use strict';

/**
 * @ngdoc directive
 * @name slangchatApp.directive:footer
 * @description
 * # footer
 */
angular.module('slangchatApp')
  .directive('footer', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the footer directive');
      }
    };
  });