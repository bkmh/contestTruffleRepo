/*
var BabyContract = artifacts.require("BabyContract");

module.exports = function(deployer) {
  deployer.deploy(BabyContract);
};
*/

//var BabyContract = artifacts.require("./BabyContract.sol");
var BatteryEvalContract = artifacts.require("BatteryEvalContract");

module.exports = function(deployer, network) {

  // BKMH - token 연계를 위해, network 분리
  if (network == "development") {
    deployer.deploy(BatteryEvalContract);
  }

  if (network == "besuTest") {
    deployer.deploy(BatteryEvalContract)
  }
};