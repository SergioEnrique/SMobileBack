'use strict';

/**
 * @ngdoc function
 * @name slangchatApp.controller:ConversacionCtrl
 * @description
 * # ConversacionCtrl
 * Controller of the slangchatApp
 */
angular.module('slangchatApp')
    .controller('ConversacionCtrl', function ($scope, FBURL, $firebaseArray, $window, $timeout, $routeParams, $localStorage) {
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

    });