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
