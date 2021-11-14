import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
// require("dotenv").config({ path: "../.env.local" });

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  process.env.FACTORY_ADDRESS
);

instance.options.address = process.env.FACTORY_ADDRESS;

export default instance;