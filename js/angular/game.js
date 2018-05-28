var angularApp = angular.module('game', [])
    .controller('GameController', ['$scope', function ($scope) {
        var game = this;

        $scope.blockchain = null;
        $scope.info = {};

        game.timeConverter=function (UNIX_timestamp){
            var a = new Date(UNIX_timestamp * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
            return time;
        };

        game.claimMiner = function (id) {
            console.log('miner id: ' + id);
        };

        game.miners = function () {
            if ($scope.info && $scope.info.user && $scope.info.user.items) {
                return $scope.info.user.items;
            } else {
                return [];
            }
        };

        game.becomeASponsor = function () {
            console.log('become a sponsor');
        };

        game.claimCoins = function () {
            console.log('Claim coins');
            claimDailyReward();
        };

        game.createMiner = function () {
            console.log('createMiner');
            $scope.blockchain.createMiner(function (data) {
                console.log('game.createMiner');
                console.log(data);
            });
        };

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
