"use strict";

var Game = function () {

};

Game.prototype = {
    init: function () {

    },

    getClaimMinerTime: function () {
        return 10800; // three hours - 10800
    },

    getClaimDailyRewardTime: function () {
        return 86400; // one day - 86400
    },

    getUserInfo: function (address) {
        var data = LocalContractStorage.get(address);
        if (data) {
            var key = "lastClaimDailyReward_" + Blockchain.transaction.from;
            var lastClaim = LocalContractStorage.get(key);
            if (!lastClaim) {
                lastClaim = 0;
            }

            data.isCanClaimDailyReward = lastClaim < Blockchain.transaction.timestamp;
        }

        return data;
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

        info.items.push({
            id: info.lastItemId,
            type: "miner",
            price: price,
            created: Blockchain.transaction.timestamp,
            until: Blockchain.transaction.timestamp + this.getClaimMinerTime()
        });

        LocalContractStorage.set(Blockchain.transaction.from, info);
    },

    claimMiner: function (id) {
        var isChanged = false;
        var info = LocalContractStorage.get(Blockchain.transaction.from);
        var claimMinerTime = this.getClaimMinerTime();
        if (info.items) {
            info.items.forEach(function (v, i, a) {
                if (v.id == id) {
                    if (Blockchain.transaction.timestamp > v.until) {
                        a[i].until = Blockchain.transaction.timestamp + claimMinerTime;
                        info.balance += v.price;
                        isChanged = true;
                    }
                }
            });
        } else {
            throw new Error("Empty items");
        }

        if (isChanged) {
            LocalContractStorage.set(Blockchain.transaction.from, info);
        }
    },

    claimDailyReward: function () {
        var key = "lastClaimDailyReward_" + Blockchain.transaction.from;
        var lastClaim = LocalContractStorage.get(key);
        if (!lastClaim) {
            lastClaim = 0;
        }

        if (Blockchain.transaction.timestamp - lastClaim >= this.getClaimDailyRewardTime()) {
            var info = LocalContractStorage.get(Blockchain.transaction.from);
            if (!info || info.balance === undefined) {
                info = {
                    balance: 100,
                    isCanClaimDailyReward: false
                };
            } else {
                info.balance += 100;
            }
        } else {
            throw new Error("Claim time not to come");
        }

        LocalContractStorage.set(Blockchain.transaction.from, info);
        LocalContractStorage.set(key, Blockchain.transaction.timestamp + this.getClaimDailyRewardTime())
    }
};
module.exports = Game;