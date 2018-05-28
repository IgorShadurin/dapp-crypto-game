var Game = (function () {
    function Game(blockchain) {
        this.blockchain = blockchain;
    }

    Game.prototype.claimMinerCoins = function (onComplete) {
        this.blockchain.claimMinerCoins(onComplete);
    };

    Game.prototype.createMiner = function (onComplete) {
        this.blockchain.createMiner(onComplete);
    };

    Game.prototype.getContractBalance = function (onComplete) {
        this.blockchain.getContractBalance(onComplete);
    };

    Game.prototype.getBlockchain = function () {
        return this.blockchain;
    };

    Game.prototype.getInfo = function (onComplete) {
        var self = this;
        this.blockchain.getContractBalance(function (balance) {
            self.blockchain.getUserInfo(function (r) {
                //console.log(r);
                var isNewUser = false;
                if (!r || r.balance === undefined) {
                    isNewUser = true;
                }

                var info = {
                    isNewUser: isNewUser,
                    user: r,
                    jackpotSum: balance,
                    jackpotSymbol: balance + " " + self.blockchain.symbol,
                    sponsor: {
                        text: "Hi, i am sponsor",
                        address: "0x0000"
                    }
                };

                if (onComplete) {
                    onComplete(info);
                }
            });
        });
    };
    return Game;
}());