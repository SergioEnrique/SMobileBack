'use strict';

/**
 * @ngdoc overview
 * @name slangchatApp
 * @description
 * # slangchatApp
 *
 * Main module of the application.
 */
angular.module('slangchatApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.ref',
    'ui.materialize'
  ]);

'use strict';

/**
 * @ngdoc function
 * @name slangchatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slangchatApp
 */
angular.module('slangchatApp')
    .controller('inicioNumero', ["$scope", "$window", function ($scope, $window) {
            //predefine un valor para el select
            $scope.inicio = {
                pais: 'Seleccion un país'
            };
            $scope.enviarNumero = function (inicio){

                $window.alert('Enviamos un SMS al numero: ' + inicio.numero);

            };
        }]);
angular.module('firebase.config', [])
  .constant('FBURL', 'https://sweltering-fire-109.firebaseio.com');

angular.module('firebase.ref', ['firebase', 'firebase.config'])
  .factory('Ref', ['$window', 'FBURL', function($window, FBURL) {
    'use strict';
    return new $window.Firebase(FBURL);
  }]);

'use strict';
/**
 * @ngdoc function
 * @name slangchatApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * A demo of using AngularFire to manage a synchronized list.
 */
angular.module('slangchatApp')
  .controller('ChatCtrl', ["$scope", "Ref", "$firebaseArray", "$timeout", function ($scope, Ref, $firebaseArray, $timeout) {
    // synchronize a read-only, synchronized array of messages, limit to most recent 10
    $scope.messages = $firebaseArray(Ref.child('messages').limitToLast(10));

    // display any errors
    $scope.messages.$loaded().catch(alert);

    // provide a method for adding a message
    $scope.addMessage = function(newMessage) {
      if( newMessage ) {
        // push a message to the end of the array
        $scope.messages.$add({text: newMessage})
          // display any errors
          .catch(alert);
      }
    };

    function alert(msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }
  }]);

'use strict';

angular.module('slangchatApp')
  .filter('reverse', function() {
    return function(items) {
      return angular.isArray(items)? items.slice().reverse() : [];
    };
  });

'use strict';
/**
 * @ngdoc overview
 * @name slangchatApp:routes
 * @description
 * # routes.js
 *
 * Configure routes for use with Angular, and apply authentication security
 */
angular.module('slangchatApp')

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/inicioNumero.html',
        controller: 'inicioNumero'
      })

      .when('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl'
      })
      .otherwise({redirectTo: '/'});
  }]);

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