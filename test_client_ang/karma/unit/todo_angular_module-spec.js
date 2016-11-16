//require('../../public/js/todos_ang.js');

describe('todo angular view', function() {
  // https://github.com/sakshisingla/Protractor-Non-Angular-Tests/wiki/Creating-test-scripts-using-Protractor-for-non-angular-application

  var $httpBackend, $rootScope, createController, authRequestHandler;

  // Set up the module
  beforeEach(module('myapp'));

  beforeEach(inject(function($injector) {
    // Set up the mock http service responses
    $httpBackend = $injector.get('$httpBackend');
    // backend definition common for all tests
    authRequestHandler = $httpBackend
    .when('GET', 'https://localhost/todo_rest_api2')
//    .respond({userId: 'userX'}, {'A-Token': 'xxx'});
    .respond([
      {"text":"11",             "done":true, "id":38},
      {"text":"qwdqewdq",       "done":false,"id":37},
      {"text":"aaaa",           "done":false,"id":31},
      {"text":"wethw rth wrth", "done":true, "id":30},
      {"text":"aaaaaq",         "done":false,"id":20},
      {"text":"qwdqwd",         "done":false,"id":39}
    ]);

    // Get hold of a scope (i.e. the root scope)
    $rootScope = $injector.get('$rootScope');
    // The $controller service is used to create instances of controllers
    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('MyController', {'$scope' : $rootScope });
    };
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should be on angular view page', function() {
    var controller = createController();
    expect($rootScope.todos.length).toBe(0);
    $httpBackend.flush();
    expect($rootScope.todos.length).toBe(6);
  });
});
