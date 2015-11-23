'use strict';

/**
 * @ngdoc function
 * @name slangchatApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * Controller of the slangchatApp
 */
angular.module('slangchatApp')
    .controller('ChatCtrl', function ($scope, $window, $firebaseArray, FBURL, $timeout, $localStorage) {
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




    });