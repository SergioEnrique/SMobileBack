'use strict';

/**
 * @ngdoc function
 * @name slangchatApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the slangchatApp
 */
angular.module('slangchatApp')
    .controller('inicioNumero', function ($scope, $window) {
            //predefine un valor para el select
            $scope.inicio = {
                pais: 'Seleccion un país'
            };
            $scope.enviarNumero = function (inicio){

                $window.alert('Enviamos un SMS al numero: ' + inicio.numero);

            };
        });