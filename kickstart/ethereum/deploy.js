const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("../ethereum/build/CampaignFactory.json");
require("dotenv").config({ path: "../.env.local" });

const provider = new HDWalletProvider(
  process.env.MNEMONIC, // Mnemonic
  process.env.INFURA_API // Infura API endpoint
);
const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(
      JSON.parse(compiledFactory.interface)
    ) // ABI
      .deploy({ data: compiledFactory.bytecode })
      .send({ gas: "1000000", from: accounts[0] });

    // Record the address where our contract ended up at
    console.log("Contract deployed to", result.options.address);
    provider.engine.stop();
  } catch (err) {
    console.log(err);
  }
};
deploy();
