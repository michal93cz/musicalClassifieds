'use strict';

angular.module('musicalClassifiedsApp', [
  'musicalClassifiedsApp.auth',
  'musicalClassifiedsApp.admin',
  'musicalClassifiedsApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
