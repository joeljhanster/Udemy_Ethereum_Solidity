// Contract Source -> Solidity Compiler -> 1) ABI -> Web3 & Contract Bytecode -> Rinkeby/Ganache/TestRPC (Local Test Network)
// ABI: communication between solidity world and javascript world

const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');

module.exports = solc.compile(source, 1).contracts[':Lottery'];   // Export for other files 
