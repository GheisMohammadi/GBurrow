var burrow = require('./lib/burrowgrpc.js');

//Init burrow and connect
var burrowURL = "localhost:10997"; // localhost:10997 if running locally on default port
var account = '22f536e749ccb81a3b03b99ec3a505ebc03e4f39'; // address of the account to use for signing, hex string representation 
burrow.init(burrowURL,account);

//Get List Names
burrow.listNames();

//Get Account List
burrow.listAccounts();