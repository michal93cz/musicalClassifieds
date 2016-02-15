'use strict';

describe('Controller: AddClassifiedCtrl', function () {

  // load the controller's module
  beforeEach(module('musicalClassifiedsApp'));

  var AddClassifiedCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddClassifiedCtrl = $controller('AddClassifiedCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
