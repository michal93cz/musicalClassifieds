'use strict';

describe('Controller: MyClassifiedsCtrl', function () {

  // load the controller's module
  beforeEach(module('musicalClassifiedsApp'));

  var MyClassifiedsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyClassifiedsCtrl = $controller('MyClassifiedsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
