var _nebulasAddress = null;
var NebulasChain = (function () {
    function NebulasChain(contractAddress) {
        this.contractAddress = contractAddress;
        this.name = "Nebulas";
        this.symbol = "NAS";
        this.myAddress = "";
        this.getAccount();
        this.nebulas = require("nebulas");
        this.neb = new this.nebulas.Neb();
        this.neb.setRequest(new this.nebulas.HttpRequest("https://testnet.nebulas.io"));
        this.NebPay = require("nebpay");
        this.nebPay = new this.NebPay();
    }

    NebulasChain.prototype.claimMinerCoins = function (id, onComplete) {
        this.nebPay.call(this.contractAddress, 0, "claimMiner", "[\"" + id + "\"]", {
            listener: onComplete
        });
    };

    NebulasChain.prototype.createMiner = function (onComplete) {
        var price = 10;
        this.nebPay.call(this.contractAddress, 0, "createMiner", "[\"" + price + "\"]", {
            listener: onComplete
        });
    };

    NebulasChain.prototype.getAccount = function () {
        window.postMessage({
            "target": "contentscript",
            "data": {},
            "method": "getAccount"
        }, "*");
    };

    NebulasChain.prototype.getContractBalance = function (onComplete) {
        this.neb.api.getAccountState({address: this.contractAddress}).then(function (resp) {
            var result = resp;
            //console.log('NebulasChain.prototype.getContractBalance');
            //console.log(resp);
            if (!result) {
                console.log('return');
                return;
            }

            if (onComplete) {
                onComplete(result.balance);
            }
        }).catch(function (err) {
            console.log("error:" + err.message)
        });
    };

    NebulasChain.prototype.getUserInfo = function (onComplete) {
        var myAddress = _nebulasAddress;
        var dappAddress = address;

        //var Account = this.nebulas.Account;
        //var from = Account.NewAccount().getAddressString();
        var from = _nebulasAddress;
        var value = "0";
        var nonce = "0";
        var gas_price = "1000000";
        var gas_limit = "2000000";
        var callFunction = "getUserInfo";
        var callArgs = "[\"" + myAddress + "\"]";
        var contract = {
            "function": callFunction,
            "args": callArgs
        };

        this.neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then(function (resp) {
            //console.log(resp);
            var result = resp.result;
            result = JSON.parse(result);
            //console.log("return of rpc call: " + JSON.stringify(result))

            //var resultString = JSON.stringify(result);
            console.log(result);
            if (onComplete) {
                onComplete(result);
            }

            /*if (result && result !== "null") {
             console.log('OK result');
             } else {
             console.log('NOT result');
             // todo show claim button
             }*/
        }).catch(function (err) {
            console.log("error:" + err.message)
        });
    };

    NebulasChain.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };

    return NebulasChain;
}());

window.addEventListener('message', function (e) {
    if (!_nebulasAddress) {
        if (!!e.data.data.account) {
            _nebulasAddress = e.data.data.account;
        }
    }
});