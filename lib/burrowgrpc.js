var Promise = require('promise');
const monax = require('@monax/burrow');
var options = {objectReturn: true};
var burrow;

exports.init=function(url,account)
{
    burrow = monax.createInstance(url, account, options);
}

exports.getTx=function(txHash)
{
    return new Promise(function (resolve, reject) {
        
        burrow.executionEvents.GetTx(
            {
                TxHash: txHash,
                Wait: true,
            }, (error,data)=>{
            
                if(data){
                    
                    resolve(data);
                    
                }    
                else{

                    throw "can't get Tx"
                    reject(error);   

                } 
        })
    });        
}

exports.deployByMethod1=function(abi,bytecode)
{
    const contract = burrow.contracts.new(abi, bytecode);
    return contract._constructor();
}

exports.deployByAsyncCall=function(bytecode,fromAddress,fee,amount,gaslimit)
{
    return burrow.transact.CallTxAsync({
        Input:{
                Address: fromAddress,
                Amount: amount,
            },
            Address:  new Buffer(''),
            GasLimit: gaslimit,
            Fee:      fee,
            Data:     bytecode,
        })        
}

exports.SendTx=function(fromAddr,toAddr,seq,amount)
{
    return burrow.transact.SendTxSync(
        {
            Inputs: [{
                Address: fromAddr,
                Amount: amount,
                Sequence: seq
            }],
            Outputs: [{
                Address: toAddr,
                Amount: amount
            }]
        })
}

exports.CallTx=function(fromAddr,toAddr,seq,amount,fee,gaslimit,data)
{    
   return  burrow.transact.CallTxAsync({
            Input:{
                Address: fromAddr,
                Amount: amount,
                Sequence: seq,
            },
            Address:  toAddr,
            GasLimit: gaslimit,
            Fee:      fee,
            Data:     data
        })        
}

exports.getAccountBalance=function(accAddress)
{
    return new Promise(function (resolve, reject) {
        
        burrow.query.GetAccount(accAddress, (error,data)=>{
            
            if(data){
                
                resolve(data.Balance);
                
            }    
            else{

                throw "can't get account balance"
                reject(error);   

            } 
        })
    });        
}

exports.listAccounts=function()
{
    return new Promise(function (resolve, reject) {
        burrow.query.ListAccounts('', (error,data)=>{
            if(data){    
                console.log("===============\nAddress: ",data.Address.toString('hex')) 
                console.log("Balance: ",data.Balance) 
                console.log("Sequence: ",data.Sequence,"\n===============") 
                resolve(data);
            }    
            else{
                throw "can't get list of accounts"
                reject(error);   
            } 
        })
    });        
}

exports.getAccountAddressByID=function(accIndex)
{
    let retAddress = ""
    let nAccs = 0

    return new Promise(function (resolve, reject) {
        burrow.query.ListAccounts('', (error,data)=>{
            if(data){   
                if (nAccs==accIndex)
                {
                    let retAddress=data.Address
                    resolve(retAddress);
                }
                nAccs++;
                
            }    
            else{
                throw "error--> can't get list of accounts"
                reject(error);   
            } 
        })
    });
}

exports.getAccountByID=function(accIndex)
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
                    resolve(retAcc);
                }
                nAccs++;
                
            }    
            else{
                throw "can't get list of accounts"
                reject(error);   
            } 
        })
    });
}

exports.listNames=function()
{
    return new Promise(function (resolve, reject) {
        burrow.query.ListNames('', (error,data)=>{
            if(data){    
                resolve(data);
            }    
            else{
                throw "can't get list of names"
                reject(error);   
            } 
        })
    });        
}