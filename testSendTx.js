var burrow = require('./lib/burrowgrpc.js');

//Init burrow and connect
var burrowURL = "localhost:10997"; // localhost:10997 if running locally on default port
var account = '22f536e749ccb81a3b03b99ec3a505ebc03e4f39'; // address of the account to use for signing, hex string representation 
burrow.init(burrowURL,account);

var Address1;
var Address2;
var Seq1;

burrow.getAccountByID(1).then(function(result){
    console.log("Address1 is: ",result.Address.toString('hex'));
    console.log("Sequence1 is: ",result.Sequence);
    var payload = {Address: result.Address};
    Address1 = result.Address;//.toString('hex');
    let Seq1=result.Sequence;
    burrow.getAccountBalance( payload ).then(
    function(bal){
        console.log("Balance1 is: ",bal);
    },function(err){
        console.log("get balance error");
    });
},function(err) {
    console.log("Get Account Error: ",err);
});

burrow.getAccountAddressByID(2).then(function(result){
    console.log("Address2 is: ",result.toString('hex'));
    var payload = {Address: result};
    Address2 = result;
    burrow.getAccountBalance( payload ).then(
        function(bal){
            console.log("Balance2 is: ",bal);
            console.log("Sending some money from Address1 to Address2...");
            let Seq=Seq1+1;
            burrow.SendTx(Address1,Address2,Seq,999).then(()=>{
                console.log("999$ Sent!");
                var payload = {Address: Address1};
                return burrow.getAccountBalance( payload ).then(
                    function(bal){
                        console.log("Now Balance1 is: ",bal);
                    },function(err){
                        console.log("get balance error");
                    });
            }).catch(err => console.log("SendTx error: ",err));

    },function(err){
        console.log("get balance error");
    });
},function(err) {
    console.log("Get Account Error: ",err);
}); 
