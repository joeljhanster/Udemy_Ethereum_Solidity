// Contract Source -> Solidity Compiler -> 1) ABI -> Web3 & Contract Bytecode -> Rinkeby/Ganache/TestRPC (Local Test Network)
// ABI: communication between solidity world and javascript world

const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
  language = 'Solidity',
  sources: {
    'Inbox.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
  'Inbox.sol'
].Inbox;   // Export for other files to use
