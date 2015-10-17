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
    .controller('inicioNumero', ["$scope", "$window", "$location", "$http", "$timeout", function ($scope, $window, $location, $http,$timeout) {
        $scope.modal = false;
        $scope.inicio = {
            pais: 'Seleccion un país'
        };
        $scope.enviarNumero = function (inicio) {
            $window.alert('Enviamos un SMS al numero: ' + inicio.numero);
            $http({
                    url: 'http://www.atomick.com.mx/slangchat/mensajes/codigo.php',
                    method: 'POST',
                    data: {
                        'numero': inicio.numero
                    }
                })
                .then(function (response) {
                        $scope.codigoServer = response;
                        $('#modalCodigo').openModal();
                        $scope.modal = true;
                        $window.console.log($scope.codigoServer);
                        $timeout(function(){$window.alert('Tu codigo es: ' + $scope.codigoServer.data);}, 3000);

                    },
                    function (response) {
                        $window.alert('ocurrio un error, verifica tu conexion a internet ' + response);
                    });
        };
        $scope.verificar = function (codigo) {
            if ($scope.codigoServer.data == codigo) {
                $('#modalCodigo').closeModal();
                $window.alert('el codigo coincide');
                
                $timeout(function(){$location.url('chat');},2000);
            } else {

                $window.alert('el codigo no es correcto, revisar');

            }
        };
    }]).config(['$httpProvider',
        function ($httpProvider) {
            //Reset headers to avoid OPTIONS request (aka preflight)
            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.patch = {};
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
 * Controller of the slangchatApp
 */
angular.module('slangchatApp')
  .controller('ChatCtrl', function () {
   
  });

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