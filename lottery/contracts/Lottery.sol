pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;   // dynamic array of addresses
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    // enters a player into the lottery
    // payable if we expect someone might send ether along
    function enter() public payable {
        // used for validation
        require(msg.value > .01 ether);
        
        players.push(msg.sender);
    }
    
    // no such random generator in Solidity, create pseudo random generator
    // current block difficulty + current time + addresses of players -> SHA3 algorithm -> really big number
    function random() private view returns(uint) {
        return uint(keccak256(block.difficulty, now, players)); // keccak256 or sha3 are the same
    }
    
    // randomly picks a winner and sends them the prize pool
    // random() % players.length --> random number between 0 and players.length
    // (winner will be the person at this index in the 'players' index)
    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        players = new address[](0); // initial size of 0
    }
    
    // Don't repeat yourself (function modifier)
    modifier restricted() {
        // only manager can call this function (to enforce security)
        require(msg.sender == manager);
        _;  // a target where all the code in the restricted functions will fall in here
    }
    
    function getPlayers() public view returns(address[]) {
        return players;
    }
}