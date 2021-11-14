const assert = require("assert");
const ganache = require("ganache-cli"); // Local Test Network
const Web3 = require("web3"); // Web3 is a constructor function (uppercase), purpose of each instance is to connect to multiple networks (in general just one)

/* Web3 Versioning: 
v0.x.x ("Primitive" interface - only callbacks for async code) vs
v1.x.x (Support for promises + async/await) */

/* Web3 Provider:
Provider: Telephone (replaceable depending on which network we attempt to connect to)
Web3 -> web3: Person A
Ganache: Person B */

/* Web3 With Contracts:
Goal: Interact with deployed contract -> ABI, Address of deployed contract
Goal: Create a contract -> ABI, Bytecode */

/* Rinkeby Network (Deployment with Infura):
Provider will need an account as a source of ether (uses account mnemonic to unlock account)
Rinkeby Network (Infura Node) -> Infura API -> Provider (<- Account Mnemonic) -> Web3 */

/* Infura Signup allows us to connection to Infura Node on Ethereum network */

const web3 = new Web3(ganache.provider());
const { abi, evm } = require("../compile");

/* Mocha Test Cycle:
Mocha Starts -> Deploy a new contract (beforeEach) -> Manipulate the contract (it) -> Make an assertion about the contract (it)
-> Deploy a new contract... */

/* Mocha Functions:
it: Run a test and make an assertion.
describe: Groups together 'it' functions.
beforeEach: Execute some general setup code. */

/* Running Contract Functions:
'Calling' a Function: Cannot modify the contract's data, can return data, runs instantly, free to do!
Sending a Transaction to a Function: Can modify a contract's data, takes time to execute, 
returns the transaction hash, costs money */

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ["Hi there!"]
    }) // Arguments: initialMessage
    .send({ from: accounts[0], gas: "1000000" }); // Person deploying the contract
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    assert.ok(inbox.options.address); // Address of where the contract was deployed to (if address exists => contract is deployed)
  });

  it("has a default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hi there!");
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("bye").send({ from: accounts[0] }); // Who is paying for the contract / the gas
    const message = await inbox.methods.message().call();
    assert.equal(message, "bye");
  });
});

// class Car {
//   park() {
//     return "stopped";
//   }

//   drive() {
//     return "vroom";
//   }
// }

// let car;

// beforeEach(() => {
//   car = new Car();
// });

// describe("Car Test", () => {
//   it("can park", () => {
//     assert.equal(car.park(), "stopped");
//   });

//   it("can drive", () => {
//     assert.equal(car.drive(), "vroom");
//   });
// });
