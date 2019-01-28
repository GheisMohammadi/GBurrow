var burrow = require('./lib/burrowgrpc.js');

//Contract Deploy
//var addressToCreate = "6075EADD0C7A33EE6153F3FA1B21E4D80045FCE2"

	//Test Smart Contract
	/*
		pragma solidity ^0.4.24;
		contract SimpleStorage {
			uint private _balance;
			uint private _storedData;
			address private owner;
			event notifyStorage(uint x);
			constructor() public {
				owner = msg.sender;
			}
			function set(uint x) public payable {
				_storedData = x;
				emit notifyStorage(x);
			}
			function get() public view returns (uint) {
				return _storedData;
			}
			function getOwner() public view returns (address){
				return owner;
			}
			function kill() public{
				selfdestruct(owner);
			}
		}
    */
   
let abi =[{
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "x",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "x",
				"type": "uint256"
			}
		],
		"name": "notifyStorage",
		"type": "event"
	}];

   
let bytecode="608060405234801561001057600080fd5b5033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506101fc806100616000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b51461006757806360fe47b11461007e5780636d4ce63c1461009e578063893d20e8146100c9575b600080fd5b34801561007357600080fd5b5061007c610120565b005b61009c6004803603810190808035906020019092919050505061015b565b005b3480156100aa57600080fd5b506100b361019c565b6040518082815260200191505060405180910390f35b3480156100d557600080fd5b506100de6101a6565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b806001819055507f23f9887eb044d32dba99d7b0b753c61c3c3b72d70ff0addb9a843542fd764212816040518082815260200191505060405180910390a150565b6000600154905090565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050905600a165627a7a72305820efe43c98f939ca519e2b64247767bfd6f92a3dd5b31cb5d9f24e57723aaa306f0029";

//Init burrow and connect
var burrowURL = "localhost:10997"; // localhost:10997 if running locally on default port
var account = '22f536e749ccb81a3b03b99ec3a505ebc03e4f39'; // address of the account to use for signing, hex string representation 
burrow.init(burrowURL,account);

let addrFrom=new Buffer(account,'hex')

//Test Deploying by Method 1
burrow.deployByMethod1(abi,bytecode).then( contract => {
	console.log("Contract Address1: ",contract);
	//contract.set.at(contract,123456).then(() => contract.get.at(contract));
}).catch(err => console.log("deploy method 1 error: ",err));

//Test Deploying by Async Call
burrow.deployByAsyncCall(bytecode,addrFrom,0,0,10000).then(txe=>{
	console.log("ASync TX=>",txe);
}).catch(err => console.log("deploy method 2 (async) error: ",err));