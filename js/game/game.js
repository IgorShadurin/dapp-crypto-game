var Game = (function () {
    function Game(blockchain) {
        this.blockchain = blockchain;
    }

    Game.prototype.getBlockchain = function () {
        return this.blockchain;
    };

    Game.prototype.getInfo = function (onComplete) {
        var info = {
            jackpotSum: "123",
            jackpotSymbol: "123 " + this.blockchain.symbol,
            sponsor: {
                text: "Hi, i am sponsor",
                address: "0x0000"
            }
        };

        if (onComplete) {
            onComplete(info);
        }
    };
    return Game;
}());