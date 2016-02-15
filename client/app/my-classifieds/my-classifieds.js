'use strict';

angular.module('musicalClassifiedsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('my-classifieds', {
        url: '/my-classifieds',
        templateUrl: 'app/my-classifieds/my-classifieds.html',
        controller: 'MyClassifiedsCtrl'
      });
  });
