// Contract export 를 위한 javaScript
// server.js 를 통해 initialize

// ehterApp.js -> BatteryEvalContract.sol 호출
const contract = require('truffle-contract');

const batteryEval_artifact = require('../build/contracts/BatteryEvalContract.json');

var batteryEvalChain = contract(batteryEval_artifact);

module.exports = {
  // Baby 등록 호출
  // function addBatteryEvalInfo(string memory _owner, string memory _manufacturer, string memory _modelName, string memory _manufactureDate, string memory _certiFile) public {  
  addBatteryEvalInfo : function(bOwner, bManuFacturer, bModelName, bManuFactureDate, bCertiFile, callback) {
    console.log("**** etherApp.addBatteryEvalInfo start ****");

    var self = this;
    batteryEvalChain.setProvider(self.web3.currentProvider);
    var batteryInstance;

    self.web3.eth.getAccounts(function(error, accounts) { // accounts : Ethereum Node에 생성된 계정들의 목록
      if (error) {
        console.log("ERROR:"+error);
      }

      var account = accounts[0]; // 0번 계정의 주소
      console.log("ACCOUNT: " + account);

      batteryEvalChain.deployed().then(function(instance) {
        batteryInstance = instance;
        
        // BabyContract.sol:addBaby 호출
        return batteryInstance.addBatteryEvalInfo(bOwner, bManuFacturer, bModelName, bManuFactureDate, bCertiFile, {from: account});
      }).then(function(result) {
        console.log("RESULT: " + result);
        console.log("**** etherApp.addBatteryEvalInfo end ****");

        callback(result);
      }).catch(function(e) {
        // ERROR
        console.log(e);
      });
    });
  },

  // Batteries length 출력
  getBatteriesCount : function(callback) {
    console.log("**** etherApp.getBatteriesCount start ****");

    var self = this;
    batteryEvalChain.setProvider(self.web3.currentProvider);
        
    var batteryInstance;
    batteryEvalChain.deployed().then(function(instance) {
      batteryInstance = instance;

      // BatteryEvalContract.sol:getBatteriesCount 호출
      return batteryInstance.getBatteriesCount.call();
    }).then(function(length) {
      console.log("LENGTH: " + length);
      console.log("**** etherApp.getBatteriesCount end ****");

      callback(length);
    }).catch(function(e) {
      // ERROR 
      console.log(e);
    });
  },

  // batteries Index 입력 ->  Battery 객체 내 전 항목 값 출력
  getBatteryInfoById : function(id, callback) {
    console.log("**** etherApp.getBatteryInfoById start ****");

    var self = this;
    batteryEvalChain.setProvider(self.web3.currentProvider);

    var batteryInstance;
    batteryEvalChain.deployed().then(function(instance) {
      batteryInstance = instance;

        // BatteryEvalContract.sol:getBatteryInfoById 호출
        return batteryInstance.getBatteryInfoById(id);
    }).then(function(data) {
      console.log("DATA: "+ JSON.stringify(data));
      console.log("**** etherApp.getBatteryInfoById end ****");

      var result = module.exports.makeObject(data);
      
      callback(result);
    }).catch(function(e) {
      // ERROR
      console.log(e);
    });
  },


  // string batteryOwner;
  // string batteryManuFacturer;
  // string batteryModelName;
  // string batteryManuFactureDate;
  // string certiFileName;

  // Batteries 구조체 내용 출력
  makeObject : function(data) {
    var result = {
      'batteryOwner' : data.batteryOwner,
      'batteryManuFacturer' : data.batteryManuFacturer,
      'batteryModelName' : data.batteryModelName,
      'batteryManuFactureDate' : data.batteryManuFactureDate,
      'certiFileName' : data.certiFileName,
    };

    return result;
  }
}
