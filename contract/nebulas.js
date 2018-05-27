"use strict";

var Game = function () {

};

Game.prototype = {
    init: function () {

    },

    getUserInfo: function (address) {
        return JSON.stringify(LocalContractStorage.get(address));
    },

    createMiner: function (price) {
        var info = LocalContractStorage.get(Blockchain.transaction.from);
        price = parseInt(price);
        if (!info || info.balance < price) {
            throw new Error("Empty info or not enough balance ");
        }

        info.balance -= price;
        if (!info.items) {
            info.items = [];
        }

        if (info.lastItemId === undefined) {
            info.lastItemId = 0;
        } else {
            info.lastItemId++;
        }

        var oneDay = 86400;
        info.items.push({
            id: info.lastItemId,
            type: "miner",
            price: price,
            created: Blockchain.transaction.timestamp,
            until: Blockchain.transaction.timestamp + oneDay
        });

        LocalContractStorage.set(Blockchain.transaction.from, info);
    },

    claimMiner: function (id) {
        //var oneDay = 86400;
        var threeHours = 10800;
        var isChanged = false;
        var info = LocalContractStorage.get(Blockchain.transaction.from);
        if (info.items) {
            info.items.forEach(function (v, i, a) {
                if (v.id == id) {
                    if (Blockchain.transaction.timestamp > v.until) {
                        a[i].until = Blockchain.transaction.timestamp + threeHours;
                        info.balance += v.price;
                        isChanged = true;
                    }
                }
            });
        } else {
            throw new Error("Empty items");
        }

        LocalContractStorage.set(Blockchain.transaction.from, info);
    },

    claimDailyReward: function () {
        var oneDay = 86400;

        var lastClaim = LocalContractStorage.get("lastClaimDailyReward");
        if (!lastClaim) {
            lastClaim = 0;
        }

        if (Blockchain.transaction.timestamp - lastClaim >= oneDay) {
            var info = LocalContractStorage.get(Blockchain.transaction.from);
            if (!info || info.balance === undefined) {
                info = {
                    balance: 100
                };
            } else {
                info.balance += 100;
            }
        } else {
            throw new Error("Claim time not to come");
        }

        LocalContractStorage.set(Blockchain.transaction.from, info);
        LocalContractStorage.set("lastClaimDailyReward", Blockchain.transaction.timestamp + oneDay)
    }
};
module.exports = Game;
//n1kETf8wx2GdyAy34zeEsi6apNDdS1puCXA
//n1qJ86ndyNRz5w69Ta7PqBKu2aMwEsxXzPd