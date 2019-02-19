var burrow = require('./lib/burrowgrpc.js');

//Init burrow and connect
var burrowURL = "0.0.0.0:10997"; // localhost:10997 if running locally on default port
var account = '80205C8B170692957ED4C86B3B4171ECB12233BD'; // address of the account to use for signing, hex string representation 
burrow.init(burrowURL,account);

let hash=new Buffer("957ED4C86B3B4171ECB1",'hex')

burrow.getTx(hash).then(txe => console.log(txe)).catch(err => console.error(err))   