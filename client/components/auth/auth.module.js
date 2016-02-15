'use strict';

angular.module('musicalClassifiedsApp.auth', [
  'musicalClassifiedsApp.constants',
  'musicalClassifiedsApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
