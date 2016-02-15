'use strict';

angular.module('musicalClassifiedsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('add-classified', {
        url: '/add-classified',
        templateUrl: 'app/add-classified/add-classified.html',
        controller: 'AddClassifiedCtrl',
        controllerAs: 'addClass'
      });
  });
