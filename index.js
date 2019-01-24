var Promise = require('promise');
var converter=require('hex2dec');
var bytes=require('bytes');
const monax = require('@monax/burrow');
const assert = require('assert');
var burrowURL = "localhost:10997"; // localhost:10997 if running locally on default port
var account = '063298F02CDE6865C83229EFEDD690D3B1DDCF2F'; //''; // address of the account to use for signing, hex string representation 
var options = {objectReturn: true};
var burrow = monax.createInstance(burrowURL, account, options);


//listNames();
var Address2;
var nullAddr  = new Uint8Array(20);

/*
CallTx(new Buffer('063298F02CDE6865C83229EFEDD690D3B1DDCF2F'),nullAddr,2,0).then(tx =>{
    console.log("TX--->",tx)
}).catch(err => {
    console.log("ERROR--->",err)
});
*/

//listAccounts();


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

const contract = burrow.contracts.new(abi, bytecode);
contract._constructor("123").then( address1 => {
	console.log(address1 + " - SimpleContract");
    return contract.set.at(address1,123456).then(() => contract.get.at(address1));
    }).then(getValue => {
        console.log('get =>', getValue);
    }).catch(err => console.log(err));

/*
var Address1;
var Seq1;
getAccountByID(1).then(function(result){
    console.log("Address1 is: ",result.Address.toString('hex'));
    console.log("Sequence1 is: ",result.Sequence);
    var payload = {Address: result.Address};
    Address1 = result.Address;//.toString('hex');
    let Seq1=result.Sequence;
    getAccountBalance( payload ).then(
    function(bal){
        console.log("Balance1 is: ",bal);
    },function(err){
        console.log("get balance error");
    });
},function(err) {
    console.log("Get Account Error: ",err);
});

var Address2;
getAccountAddressByID(2).then(function(result){
    console.log("Address2 is: ",result.toString('hex'));
    var payload = {Address: result};
    let Address2 = result;//.toString('hex');
    getAccountBalance( payload ).then(
    function(bal){
        console.log("Balance2 is: ",bal);

        console.log("Sending some money from Address1 to Address2...");
        let Seq=Seq1+1;
        //SendTx(Address1,new Buffer("6075EADD0C7A33EE6153F3FA1B21E4D80045FCE2",'hex',Seq,999);
        console.log("999$ Sent!");
        var payload = {Address: Address1};
        getAccountBalance( payload ).then(
            function(bal){
                console.log("Now Balance1 is: ",bal);
            },function(err){
                console.log("get balance error");
            });
        //CallTx(Address1,new Buffer(),Seq,0);
    },function(err){
        console.log("get balance error");
    });
},function(err) {
    console.log("Get Account Error: ",err);
});

var amount = 20;
*/
/*
,function(retTX){
    
    console.log(retTX);
});
*/

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
    
function SendTx(fromAddr,toAddr,seq,amount)
{
    burrow.transact.SendTxSync(
        {
            Inputs: [{
                Address: fromAddr,//Buffer.from(from, 'hex'),
                Amount: amount,
                Sequence: seq
            }],
            Outputs: [{
                Address: toAddr,//Buffer.from(to, 'hex'),
                Amount: amount
            }]
        })
        .then(txe => console.log(txe))
        .catch(err => console.error(err));
}

function CallTx(fromAddr,toAddr,seq,amount)
{    
   console.log('\nFrom Address :' + fromAddr);
   return  burrow.transact.CallTxSync(
        {
            Input:{
                Address: fromAddr,//Buffer.from(from, 'hex'),
                Amount: amount,
                Sequence: seq,
            },
            Address:  toAddr,
            GasLimit: 100000000000,
            Fee:      0,
            Data: "608060405234801561001057600080fd5b506101ba806100206000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806312065fe01461005c578063d27b2f8f1461008d578063ef59b435146100bd575b600080fd5b34801561006857600080fd5b50610071610107565b604051808260030b60030b815260200191505060405180910390f35b34801561009957600080fd5b506100bb600480360381019080803560030b906020019092919050505061011d565b005b3480156100c957600080fd5b506100eb600480360381019080803560030b9060200190929190505050610143565b604051808260030b60030b815260200191505060405180910390f35b60008060009054906101000a900460030b905090565b806000806101000a81548163ffffffff021916908360030b63ffffffff16021790555050565b6000816000809054906101000a900460030b016000806101000a81548163ffffffff021916908360030b63ffffffff1602179055506000809054906101000a900460030b90509190505600a165627a7a723058200270790021d6119b97b5074b4ce02216dfd5588c668f661ab747689b260ef6dd0029",
        })
}

function hex_to_ascii(str1)
{
	var hex  = str1.toString();
	var str = '';
	for (var n = 0; n < hex.length; n += 2) {
        console.log("CHAR-->",parseInt(hex.substr(n, 2),16))
		str += String.fromCharCode(parseInt(hex.substr(n, 2),16));
	}
	return str;
}

function hex_to_bytes(str1)
{
	var hex  = str1.toString();
	var ret = []; //new Uint8Array(hex.length/2);
	for (var n = 0; n < hex.length; n += 2) {
        ret[n/2]= parseInt(hex.substr(n, 2),16);
	}
	return ret;
}

function getAccountBalance(accAddress)
{
    return new Promise(function (resolve, reject) {
        
        burrow.query.GetAccount(accAddress, (error,data)=>{
            
            if(data){
                
                resolve(data.Balance);
                
            }    
            else{

                console.log("can't get account balance: ",error)   
                reject(error);   

            } 
        })
    });        
}

function listAccounts()
{
    return new Promise(function (resolve, reject) {
        burrow.query.ListAccounts('', (error,data)=>{
            if(data){    
                console.log(data.Address.toString('hex')) 

                resolve(data);
            }    
            else{
                console.log("error--> can't get list of accounts")   
                reject(error);   
            } 
        })
    });        
}

function getAccountAddressByID(accIndex)
{
    let retAddress = ""
    let nAccs = 0

    return new Promise(function (resolve, reject) {
        burrow.query.ListAccounts('', (error,data)=>{
            if(data){   
                if (nAccs==accIndex)
                {
                    let retAddress=data.Address
                    //console.log("ADDR:",retAddress)
                    resolve(retAddress);// Buffer.from(retAddress));
                }
                nAccs++;
                
            }    
            else{
                console.log("error--> can't get list of accounts")   
                reject(error);   
            } 
        })
    });
    //return retAddress;
    //p.then(function (retAddress) {return retAddress;});
}

function getAccountByID(accIndex)
{
    var retAcc
    let nAccs = 0

    return new Promise(function (resolve, reject) {
        burrow.query.ListAccounts('', (error,data)=>{
            if(error)
                throw "Error happen!"
            if(data){   
                if (nAccs==accIndex)
                {
                    let retAcc=data
                    //console.log("ADDR:",retAddress)
                    resolve(retAcc);// Buffer.from(retAddress));
                }
                nAccs++;
                
            }    
            else{
                console.log("error--> can't get list of accounts")   
                reject(error);   
            } 
        })
    });
    //return retAddress;
    //p.then(function (retAddress) {return retAddress;});
}

function listNames()
{
    return new Promise(function (resolve, reject) {
        burrow.query.ListNames('', (error,data)=>{
            if(data){    
                console.log("names-->",data)                                           
                resolve(data);
            }    
            else{
                console.log("error--> can't get list of names")   
                reject(error);   
            } 
        })
    });        
}