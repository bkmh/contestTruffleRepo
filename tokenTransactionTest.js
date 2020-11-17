const fs = require("fs");
const path = require("path");
const Web3 = require("web3");
// const ethTx = require('ethereumjs-tx')
const ethTx = require('ethereumjs-tx').Transaction;
const ethCommon = require('ethereumjs-common').default;
const async = require('async')
// const ABI = JSON.parse(fs.readFileSync(path.join(__dirname,'./build/contracts/SampleToken.json'), 'utf-8'));
const ABI = JSON.parse(fs.readFileSync(path.join(__dirname,'./build/contracts/BatteryPaymentToken.json'), 'utf-8'));
const args = process.argv.slice(2);
// web3 initialization - must point to the HTTP JSON-RPC endpoint
var provider = args[0] || 'https://besutest.chainz.network';

// var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6WyJ3ZWIzOioiLCJuZXQ6KiIsImV0aDoqIiwiZGVidWc6KiIsInR4cG9sOioiLCJlZWE6KiJdLCJleHAiOjE2MDUzMzUwOTZ9.xO3G29-45nokWAnLHVGEsfvECKLqpY4ZBVh8J_8eGNgPRstRd8D_aHouUGKWmv5_rRSEKsqun8uoIFflE-sMCcqEnUKhZusL2VqH3DghQ3iW--pxTTWyKJyXboXnX6XtPqChMtxqCSo_lro-FpcqdYU_S1f3Wv8LUgW-Com_4V3vhZ4X6DvsUyGOK7OUNq35148XH2UaIyDNvvWkqNvm1YD5lPoVS5ndB0IqbGTHZ7EXXRxwEKTYJtp2Ha2XPcJpX-JwSglqmPqCVcCNLVz2nV_hOtyPqGypx_KngE2v33LgGb0ud2QUN2fZWm93pNGv-zbSeZ5RViipjDJbxrl4kg";
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6WyJuZXQ6KiIsImV0aDoqIiwiZGVidWc6KiIsInR4cG9vbDoqIiwiZWVhOioiXSwiZXhwIjoxNjA3MDQwNTcyLCJ0ZWFtIjoiMTUifQ.DBqpJ6BDatOkrQR4PVACUYmDj5vta1AougF3UB_bU9y7OpgATCzJuGOtQO-Tj5PhwG6CI0nz4zbm0v9bXG4yYrNKz5SWod4HPeVPbPwk2mj1_6wwzGtz-mMOEDSoae0lESEqSsWJXFuz9Ev8Q6IMshCjw9bIUsZikCJ5NFugr8ZuImiAyR8frHsa5GSVy_HW7yJA3jN42lhU1371O8rgJ7p91fMeIU-L7-Su9_wXn8u35RWmq93DLeI2-KB4extgKXr7yU3TwD9_C305Uy93D5aBdKoT1jjYBLdmpWPlZw6Eilvh39tvsO36HFEfbkgPb_qnIzPmSCdkV1FqX8hdNg";

var options = {
    headers: [{
        name:"Authorization" , value: "Bearer " + token
    }]
};

var web3 = new Web3(new Web3.providers.HttpProvider(provider, options))
/*
var options = {
    headers: {
        "Authorization":"Bearer " + token
    }
};
var web3 = new Web3(new Web3.providers.WebsocketProvider(provider, options))
*/

// All of these network's params are the same than mainnets', except for name, chainId, and
// networkId, so we use the Common.forCustomChain method.
const customCommon = ethCommon.forCustomChain(
	'mainnet',
	{
	  name: 'besutest',
	  networkId: 2020,
	  chainId: 2020,
	},
	'constantinople',
  )

// let commonOptions = ethCommon('besutest', );

// commonOptions.params('chainId', '2020');

web3.transactionConfirmationBlocks = 1;
var contractAddress = '0x50DfFa2f4F435b3Bf92Acd795a007DC0cF324c54';
var contract = new web3.eth.Contract((ABI.abi), contractAddress);
// const addressFrom = '0xf17f52151ebef6c7334fad080c5704d77216b732';
const addressFrom = '0x627306090abaB3A6e1400e9345bC60c78a8BEf57';
const privKey = Buffer.from('ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f', 'hex')
const addressTo = '0x947F83256222d1FaD65839cC3977b188fE49Bb2e'
const main = async () => {
	try {

		var chainId = web3.eth.getChainId().then(console.log);

		txnCount = await web3.eth.getTransactionCount(addressFrom, "pending")

		console.log('1');

    	const txObject = {
          nonce: web3.utils.numberToHex(txnCount),
          gasPrice: web3.utils.numberToHex(0x00),
          gasLimit: web3.utils.numberToHex(65000),
		  from : addressFrom,
		  to : contractAddress,
		  value : '0x00',
		  data: contract.methods.transfer(addressTo, '10').encodeABI(),
		//   chainId : '0x' + chainId
		}
		console.log('2');
		const tx = new ethTx(txObject, {common: customCommon}, );
		// const tx = new Tx(txObject)
		console.log(tx);
		tx.sign(privKey);
		console.log('4');
		var rawTxHex = '0x' + tx.serialize().toString('hex');
		console.log('5');
		const receipt = await web3.eth.sendSignedTransaction(rawTxHex).on('receipt', console.log)
		console.log('6');
		console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);
		console.log(`Total\'s balance total: ${await contract.methods.totalSupply().call()}`);
		console.log(`From\'s balance after transfer: ${await contract.methods.balanceOf(addressFrom).call()}`);
		console.log(`To\'s balance after transfer: ${await contract.methods.balanceOf(addressTo).call()}`);
	} catch (err) {
		console.log(err);
	}
}
main();