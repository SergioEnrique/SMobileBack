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
    'ui.materialize',
    'ngStorage'
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
    .controller('inicioNumero', ["$scope", "$window", "$location", "$http", "$timeout", "$firebaseArray", "FBURL", "$localStorage", function ($scope, $window, $location, $http, $timeout, $firebaseArray, FBURL, $localStorage) {


        if ($localStorage.numero == undefined) {

            $scope.modal = false;
            $scope.inicio = {
                pais: 'Seleccion un país'
            };
            $scope.enviarNumero = function (inicio) {
                $scope.numero = inicio.numero;
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
                            $timeout(function () {
                                $window.alert('Tu codigo es: ' + $scope.codigoServer.data);
                            }, 3000);

                        },
                        function (response) {
                            $window.alert('ocurrio un error, verifica tu conexion a internet ' + response);
                        });
            };
            $scope.verificar = function (codigo) {
                if ($scope.codigoServer.data == codigo) {

                    var ref = new Firebase(FBURL).child('usuarios');
                    var usuarios = $firebaseArray(ref);

                    usuarios.$loaded().then(function () {
                        usuarios.$add({
                            numero: $scope.numero
                        }).then(function (ref) {
                            $localStorage.numero = $scope.numero;

                            $window.$('#modalCodigo').closeModal();
                            $window.alert('el codigo coincide');

                            $timeout(function () {
                                $location.url('chat');
                            }, 1000);

                        });
                    });
                } else {

                    $window.alert('el codigo no es correcto, revisar');

                }
            };
        } else {

            $window.console.log('con numero: '+ $localStorage.numero );
            
            $location.url('chat');
            

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
    .controller('ChatCtrl', ["$scope", "$window", "$firebaseArray", "FBURL", "$timeout", "$localStorage", function ($scope, $window, $firebaseArray, FBURL, $timeout, $localStorage) {
        // numero del localstorage

        $scope.numero = $localStorage.numero;


        //contactos
        var ref = new Firebase(FBURL).child('usuarios');
        var usuarios = $firebaseArray(ref);

        usuarios.$loaded().then(function () {
            $scope.usuarios = usuarios;
            console.log(usuarios.$keyAt)
            angular.forEach(usuarios, function (value, key) {
    
                

                var conversacion = $scope.numero < value.numero ? $scope.numero + value.numero : value.numero + $scope.numero;
                var refLM = new Firebase(FBURL).child('mensajes').child(conversacion).orderByChild('timestamp').limitToLast(1);
                var ultimoMensaje = $firebaseArray(refLM);
                    $scope.ultimosMensajes = [];
                ultimoMensaje.$loaded().then(function () {

                    $window.console.log(ultimoMensaje);
                    ultimoMensaje[0].grupoID = conversacion;
                    console.log(ultimoMensaje);
                    $scope.ultimosMensajes.push(ultimoMensaje[0]);

                });

            });
        });


        // chat 1 a 1
        $scope.unoauno = function (id1, id2) {
            var grupo = id1 < id2 ? id1 + id2 : id2 + id1;

            $window.location.href = '#/conversacion/'+grupo;

        };
    
        $scope.conversacion = function(grupoID){
            
            var grupoC = grupoID;
            
            $window.location.href = '#/conversacion/'+grupoC;
        };




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
        .when('/conversacion/:grupo', {
        templateUrl: 'views/conversacion.html',
        controller: 'ConversacionCtrl'
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
'use strict';

/**
 * @ngdoc function
 * @name slangchatApp.controller:ConversacionCtrl
 * @description
 * # ConversacionCtrl
 * Controller of the slangchatApp
 */
angular.module('slangchatApp')
    .controller('ConversacionCtrl', ["$scope", "FBURL", "$firebaseArray", "$window", "$timeout", "$routeParams", "$localStorage", function ($scope, FBURL, $firebaseArray, $window, $timeout, $routeParams, $localStorage) {
        $scope.numero = $localStorage.numero;
        var grupo = $routeParams.grupo;
        var ref = new Firebase(FBURL).child('mensajes').child(grupo).orderByChild('timestamp');
        var mensajes = $firebaseArray(ref);

        mensajes.$loaded().then(function () {
            $scope.mensajes = mensajes;
            console.log(mensajes);
            $timeout(function () {
                $scope.scroll = true;
            }, 2500);
        });

            
        $scope.mensajesEnviar = function (mensaje) {

            $scope.mensajes.$add({
                numero: $scope.numero,
                mensaje: mensaje,
                timestamp: Firebase.ServerValue.TIMESTAMP,
                nombre: 'nombre prueba'
            }).then(function (ref) {
                $scope.mensaje = '';
                $window.console.log('insertado');
            });

        };

    }]);