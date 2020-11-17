var BatteryPaymentToken = artifacts.require("BatteryPaymentToken");
const _name = "BatteryPaymentToken";
const _symbol = "BPT";
const _decimals = 18;
//const _total_supply = 10000000000; // 최초 발행되는 전체 Token 수량
const _total_supply = 10000; // 최초 발행되는 전체 Token 수량

module.exports = function(deployer, network) {

    // BKMH - 실제 token 을 테스트넷에 올리기 위해 network 명칭 분리
    if (network == "development") {
        deployer.deploy(BatteryPaymentToken, _name, _symbol, _decimals, _total_supply);
    }

    if (network == "besuTest") {
        deployer.deploy(BatteryPaymentToken, _name, _symbol, _decimals, _total_supply);
    }
};