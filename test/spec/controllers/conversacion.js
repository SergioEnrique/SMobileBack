'use strict';

describe('Controller: ConversacionCtrl', function () {

  // load the controller's module
  beforeEach(module('slangchatApp'));

  var ConversacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConversacionCtrl = $controller('ConversacionCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
