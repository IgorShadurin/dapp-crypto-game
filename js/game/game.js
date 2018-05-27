var Game = (function () {
    function Game(blockchain) {
        this.blockchain = blockchain;
    }

    Game.prototype.getContractBalance = function (onComplete) {
        this.blockchain.getContractBalance(onComplete);
    };

    Game.prototype.getBlockchain = function () {
        return this.blockchain;
    };

    Game.prototype.getInfo = function (onComplete) {
        var self = this;
        this.blockchain.getUserInfo(function (r) {
            var info = {
                isNewUser: !!r,
                user: r,
                jackpotSum: "123",
                jackpotSymbol: "123 " + self.blockchain.symbol,
                sponsor: {
                    text: "Hi, i am sponsor",
                    address: "0x0000"
                }
            };

            if (onComplete) {
                onComplete(info);
            }
        });

    };
    return Game;
}());