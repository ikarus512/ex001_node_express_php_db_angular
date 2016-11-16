var app=angular.module("myapp", []);

app.controller('TodoController',
  ['$scope', '$location', 'todoStorage',
  function ($scope, $location, todoStorage) {
      var todos = $scope.todos = [];
       todoStorage.get().then(function(res){todos=$scope.todos=res.data;});

      $scope.newTodoText = '';
      $scope.editedTodo = null;
      $scope.originalTodo = null;

      $scope.$watch('todos', function () {
        $scope.remainingCount = todos.filter(function(v){return !v.done;}).length;
        $scope.doneCount = todos.length - $scope.remainingCount;
        $scope.allChecked = !$scope.remainingCount;
      }, true);

      if ($location.path() === '') {
        $location.path('/');
      }

      $scope.location = $location;

      $scope.$watch('location.path()', function (path) {
        $scope.statusFilter =
          (path === '/active')    ? {done:false} :
          (path === '/completed') ? {done:true } :
                                    {};
      });


      $scope.addTodo = function () {
        if(!$scope.adding) {
          $scope.adding = true;
          var newTodoText = $scope.newTodoText.trim();
          if (!newTodoText) {
            return;
          }

          todoStorage.post({text: newTodoText, done: false})
          .then(function onOk(res){
            todo=res.data;
            todos.push(todo);
            $scope.newTodoText = '';
            $scope.adding=false;
          },function onErr(res){
            $scope.newTodoText = '';
            $scope.adding=false;
          });
        }
      };




      $scope.editTodo = function (todo) {
        if(!$scope.editedTodo) {
          $scope.editedTodo = todo;
          // Clone the original todo to restore it on demand.
          $scope.originalTodo = angular.extend({},todo);
        }
      };
      $scope.doneEditing = function (todo) {
        if($scope.editedTodo) {
          $scope.editedTodo = null;
          //$scope.originalTodo = null;
          todo.text = todo.text.trim();

          //if()
          if (!todo.text) {
            $scope.removeTodo(todo);
          } else if($scope.originalTodo.text!=todo.text) {
            //update this todo in database
            todoStorage.put(todo);
          }
          $scope.originalTodo = null;
        }
      };
      $scope.revertEditing = function (todo) {
        if($scope.editedTodo) {
          todos[todos.indexOf(todo)] = $scope.originalTodo;
          $scope.doneEditing($scope.originalTodo);
        }
      };

      $scope.toggleTodo = function(todo) {
        todoStorage.put(todo);
      }

      $scope.removeTodo = function (todo) {
        todoStorage.delete(todo.id);
        todos.splice(todos.indexOf(todo), 1);
      };


      $scope.clearDoneTodos = function () {
        $scope.todos = todos = todos.filter(function (val) {
          return !val.done;
        });
      };

      $scope.markAll = function (done) {
        todos.forEach(function (todo) {
          todo.done = done;
        });
      };
}]);

app.directive('myFocus', ['$timeout',function($timeout) {
    'use strict';

    return function (scope, elem, attrs) {
      scope.$watch(attrs.myFocus, function (newVal) {
        if (newVal) {
          $timeout(function () {
            elem[0].focus();
          }, 0, false);
        }
      });
    };
}]);

app.directive('myEscape', function () {
    'use strict';

    var ESCAPE_KEY = 27;

    return function (scope, elem, attrs) {
      elem.bind('keyup', function (event) {
        if (event.keyCode === ESCAPE_KEY) {
          scope.$apply(attrs.myEscape);
        }
      });

      scope.$on('$destroy', function () {
        elem.unbind('keyup');
      });
    };
});

app.directive('myEnter', function () {
    'use strict';

    var ENTER_KEY = 13;

    return function (scope, elem, attrs) {
      elem.bind('keyup', function (event) {
        if (event.keyCode === ENTER_KEY) {
          scope.$apply(attrs.myEnter);
        }
      });

      scope.$on('$destroy', function () {
        elem.unbind('keyup');
      });
    };
});

app.factory('todoStorage', ['$http', function ($http) {
    return {
      get: function () {
        return $http({
          method: 'GET',
          data:{},
          url: '/todo_rest_api2'
        });
      },

      post: function (todo) {
        return $http({
          method: 'POST',
          data:todo,
          url: '/todo_rest_api2'
        });
      },

      put: function (todo) {
        return $http({
          method: 'PUT',
          data: todo,
          url: '/todo_rest_api2/'+todo.id
        });
      },

      delete: function (todo_id) {
        return $http({
          method: 'DELETE',
          data: {},
          url: '/todo_rest_api2/'+todo_id
        });
      }
    };
}]);
