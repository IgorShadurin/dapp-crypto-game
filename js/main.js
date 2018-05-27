var blockchain = new NebulasChain();
var game = new Game(blockchain);
//alert(game.getBlockchain().symbol);

var $scope = null;
setTimeout(function () {
    $scope = angular.element(document.getElementById('game-app')).scope();
    init();
}, 0);

function init() {
    game.getInfo(function (info) {
        $scope.info = info;
        $scope.$apply();
    });
}