"use strict";angular.module("slangchatApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","firebase","firebase.ref","ui.materialize"]),angular.module("slangchatApp").controller("inicioNumero",["$scope","$window",function(a,b){a.inicio={pais:"Seleccion un país"},a.enviarNumero=function(a){b.alert("Enviamos un SMS al numero: "+a.numero)}}]),angular.module("firebase.config",[]).constant("FBURL","https://sweltering-fire-109.firebaseio.com"),angular.module("firebase.ref",["firebase","firebase.config"]).factory("Ref",["$window","FBURL",function(a,b){return new a.Firebase(b)}]),angular.module("slangchatApp").controller("ChatCtrl",["$scope","Ref","$firebaseArray","$timeout",function(a,b,c,d){function e(b){a.err=b,d(function(){a.err=null},5e3)}a.messages=c(b.child("messages").limitToLast(10)),a.messages.$loaded()["catch"](e),a.addMessage=function(b){b&&a.messages.$add({text:b})["catch"](e)}}]),angular.module("slangchatApp").filter("reverse",function(){return function(a){return angular.isArray(a)?a.slice().reverse():[]}}),angular.module("slangchatApp").config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/inicioNumero.html",controller:"inicioNumero"}).when("/chat",{templateUrl:"views/chat.html",controller:"ChatCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("slangchatApp").directive("footer",function(){return{template:"<div></div>",restrict:"E",link:function(a,b,c){b.text("this is the footer directive")}}});