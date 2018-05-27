var angularApp = angular.module('game', [])
    .controller('GameController', ['$scope', function ($scope) {
        var game = this;

        $scope.info = {};

        game.loadInfo = function () {

        };

        game.todos = [
            {text: 'learn AngularJS', done: true},
            {text: 'build an AngularJS app', done: false}];

        game.addTodo = function () {
            game.todos.push({text: game.todoText, done: false});
            game.todoText = '';
        };

        game.remaining = function () {
            var count = 0;
            angular.forEach(game.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        game.archive = function () {
            var oldTodos = game.todos;
            game.todos = [];
            angular.forEach(oldTodos, function (todo) {
                if (!todo.done) game.todos.push(todo);
            });
        };
    }]);
