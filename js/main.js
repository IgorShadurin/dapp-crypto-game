// testnet
//var address = "n1zuy4Jp6ZrYGR1P8LMvCLCoZd2sbFAmhnZ";
var address = "n1g6PkEhMKs52WjeDc7mMboBpzSLxrWXrK9";
var blockchain = new NebulasChain(address);
var game = new Game(blockchain);

var $scope = null;
setTimeout(function () {
    $scope = angular.element(document.getElementById('game-app')).scope();
    init();
}, 0);

function init() {
    // todo
}

function cbCallDapp(resp) {
    console.log(resp);
    console.log("response: " + JSON.stringify(resp))
}

function claimDailyReward() {
    var NebPay = require("nebpay");
    var nebPay = new NebPay();
    nebPay.call(address, 0, "claimDailyReward", "", {
        listener: cbCallDapp
    });
}

function getInfo() {
    game.getInfo(function (info) {
        $scope.extensionEnabled = true;
        $scope.blockchain = game;
        $scope.info = info;
        $scope.$apply();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    if (typeof(webExtensionWallet) === "undefined") {
        alert("Extension wallet is not installed, please install it first.")
    } else {
        getInfo();
        setInterval(function () {
            getInfo();
        }, 3000);
    }
});

