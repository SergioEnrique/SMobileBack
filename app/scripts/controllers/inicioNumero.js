'use strict';

/**
 * @ngdoc function
 * @name slangchatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slangchatApp
 */
angular.module('slangchatApp')
    .controller('inicioNumero', function ($scope, $window, $location, $http,$timeout) {
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
    }).config(['$httpProvider',
        function ($httpProvider) {
            //Reset headers to avoid OPTIONS request (aka preflight)
            $httpProvider.defaults.headers.common = {};
            $httpProvider.defaults.headers.post = {};
            $httpProvider.defaults.headers.put = {};
            $httpProvider.defaults.headers.patch = {};
}]);