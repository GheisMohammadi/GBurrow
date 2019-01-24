var Promise = require('promise');
var converter=require('hex2dec');
var bytes=require('bytes');
const monax = require('@monax/burrow');
var burrowURL = "localhost:10997"; // localhost:10997 if running locally on default port
var account = '063298F02CDE6865C83229EFEDD690D3B1DDCF2F'; // address of the account to use for signing, hex string representation 
var options = {objectReturn: true};
var burrow = monax.createInstance(burrowURL, account, options);


listAccounts();
//listNames();

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
        SendTx(Address1,Address2,Seq,999);
        console.log("999$ Sent!");
        var payload = {Address: Address1};
        getAccountBalance( payload ).then(
            function(bal){
                console.log("Now Balance1 is: ",bal);
            },function(err){
                console.log("get balance error");
            });
            CallTx(Address1,Address2,Seq,999);
    },function(err){
        console.log("get balance error");
    });
},function(err) {
    console.log("Get Account Error: ",err);
});

var amount = 20;

/*
,function(retTX){
    
    console.log(retTX);
});
*/

//Contract Deploy
//var addressToCreate = "6075EADD0C7A33EE6153F3FA1B21E4D80045FCE2"





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
    burrow.transact.CallTxSync(
        {
            Input:{
                Address: fromAddr,//Buffer.from(from, 'hex'),
                Amount: amount,
                Sequence: seq,
            },
            Address:  new Buffer(),
            GasLimit: 100,
            Fee:      10,
            Data: "608060405234801561001057600080fd5b506040516020806108b28339810180604052602081101561003057600080fd5b8101908080519060200190929190505050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055508060ff166002816100fa9190610101565b5050610154565b81548183558181111561012857818360005260206000209182019101610127919061012d565b5b505050565b61015191905b8082111561014d5760008082016000905550600101610133565b5090565b90565b61074f806101636000396000f3fe60806040526004361061005c576000357c0100000000000000000000000000000000000000000000000000000000900480635c19a95c14610061578063609ff1bd146100b25780639e7b8d61146100e3578063b3f98adc14610134575b600080fd5b34801561006d57600080fd5b506100b06004803603602081101561008457600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610172565b005b3480156100be57600080fd5b506100c76104c7565b604051808260ff1660ff16815260200191505060405180910390f35b3480156100ef57600080fd5b506101326004803603602081101561010657600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610543565b005b34801561014057600080fd5b506101706004803603602081101561015757600080fd5b81019080803560ff169060200190929190505050610640565b005b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16156101d257506104c4565b5b600073ffffffffffffffffffffffffffffffffffffffff16600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415801561030057503373ffffffffffffffffffffffffffffffffffffffff16600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b1561036f57600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1691506101d3565b3373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156103a957506104c4565b60018160010160006101000a81548160ff021916908315150217905550818160010160026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16156104aa57816000015460028260010160019054906101000a900460ff1660ff1681548110151561048b57fe5b90600052602060002001600001600082825401925050819055506104c1565b816000015481600001600082825401925050819055505b50505b50565b6000806000905060008090505b6002805490508160ff16101561053e578160028260ff168154811015156104f757fe5b906000526020600020016000015411156105315760028160ff1681548110151561051d57fe5b906000526020600020016000015491508092505b80806001019150506104d4565b505090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415806105eb5750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff165b156105f55761063d565b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055505b50565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16806106a857506002805490508260ff1610155b156106b35750610720565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548160ff021916908360ff160217905550806000015460028360ff1681548110151561070457fe5b9060005260206000200160000160008282540192505081905550505b5056fea165627a7a723058209061ffc04667804683fe01748db07db99f66b416464677c76a87e047d3ff2a430029",
        })
        .then(txe => console.log(txe))
        .catch(err => console.error(err));
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
                console.log("data-->",data)                                           
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