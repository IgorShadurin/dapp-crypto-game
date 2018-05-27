var NebulasChain = (function () {
    function NebulasChain() {
        this.name = "Nebulas";
        this.symbol = "NAS";
    }
    NebulasChain.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return NebulasChain;
}());