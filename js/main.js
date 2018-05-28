var address = "n1qJ86ndyNRz5w69Ta7PqBKu2aMwEsxXzPd";
var blockchain = new NebulasChain(address);
var game = new Game(blockchain);
//alert(game.getBlockchain().symbol);

var $scope = null;
setTimeout(function () {
    $scope = angular.element(document.getElementById('game-app')).scope();
    init();
}, 0);

function init() {
    /*game.getInfo(function (info) {
     $scope.info = info;
     $scope.$apply();
     });*/
}

setTimeout(function () {
    /*window.postMessage({
     "target": "contentscript",
     "data": {
     "to": address,
     "value": "0",
     "contract": {  //"contract" is a parameter used to deploy a contract or call a smart contract function
     "function": "createMiner",
     "args": "[\"11\"]"
     }
     },
     "method": "neb_sendTransaction",
     }, "*");*/

    /*window.postMessage({
     "target": "contentscript",
     "data": {
     "to": address,
     "value": "0",
     "contract": {  //"contract" is a parameter used to deploy a contract or call a smart contract function
     "function": "claimDailyReward",
     //"args": para
     }
     },
     "method": "neb_sendTransaction",
     }, "*");*/

    /*window.postMessage({
     "target": "contentscript",
     "data": {
     "to": address,
     "value": "0",
     "contract": {
     "function": "getUserInfo",
     "args": "[\"" + address + "\"]"
     }
     },
     "method": "neb_call"
     }, "*");*/

    /*window.postMessage({
     "target": "contentscript",
     "data": {},
     "method": "getAccount",
     }, "*");*/

    /*window.addEventListener('message', function (e) {
     console.log("message received, msg.data: ");
     console.log(e.data);
     if (!!e.data.data.txhash) {
     console.log("Transaction hash:\n" + JSON.stringify(e.data.data.txhash, null, '\t'));
     }
     });*/
}, 2000);


function cbCallDapp(resp) {
    // resp.txhash
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
        console.log('game.getInfo');
        console.log(info);

        $scope.blockchain = game;
        $scope.info = info;
        $scope.$apply();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    /*game.getContractBalance(function (data) {
     console.log('document.addEventListener');
     console.log(data);
     });*/

    getInfo();
    setInterval(function () {
        getInfo();
    }, 3000);
});

