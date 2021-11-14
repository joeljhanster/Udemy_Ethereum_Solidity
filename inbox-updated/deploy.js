const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");
require("dotenv").config();

const provider = new HDWalletProvider(
  process.env.MNEMONIC, // Mnemonic
  process.env.INFURA_API // Infura endpoint URL
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(abi) // ABI
    .deploy({ data: evm.bytecode.object, arguments: ["Hi there!"] })
    .send({ gas: "1000000", from: accounts[0] });

  // Record the address where our contract ended up at

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop(); // To prevent deployment from hanging in the terminal
};

deploy();
