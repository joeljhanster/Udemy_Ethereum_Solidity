<!-- Lottery Contract -->
# Lottery Design
Variables:
Manager - Address of person who created the contract
Players - Array of addresses of people who have entered

Functions:
enter - Enters a player into the lottery
pickWinner - Randomly picks a winner and sends them the prize pool

<!-- Basic Solidity Types -->
`string`: Sequence of characters; e.g. "Hi there!"
`bool`: Boolean value; e.g. true, false
`int`: Integer, positive or negative. Has no decimal; e.g. 0, -30000, 59158
`uint`: 'Unsigned' integer, positive number. Has no decimal; e.g. 0, 30000, 999910
`fixed/ufixed`: 'Fixed' point number. Number with a decimal after it; e.g. 20.001, -42.4242, 3.14
`address`: Has methods tied to it for sending money; e.g. 0x18bae199c8dbae199c8d

<!-- Reference Types -->
`fixed array`: Array that contains a single ttpye of element. Has an unchanging length; e.g. int[3] --> [1,2,3], bool[2] --> [true, false]
`dynamic array`: Array that contains a single type of element. Can change in size over time; e.g. int[] --> [1,2,3], bool[] --> [true, false]
`mapping`: Collection of key value pairs. Think of Javascript objects, Ruby hashes, or Python dictionary. All keys must be of the same type, and all values must be of the same type; e.g. mapping(string => string), mapping(int => bool)
`struct`: Collection of key value pairs that can have different types; e.g. struct Car { string make; string model; uint value; }

<!-- Function Types -->
`public`: Anyone can call this function.
`private`: Only this contract can call this function.
`view`: This function returns data and does not modify the contract's data.
`constant`: This function returns data and does not modify the contract's data.
`pure`: Function will not modify or even read the contract's data.
`payable`: When someone call this function they might send ether along.

<!-- Integer Ranges -->
int8: -128 to 127
int16: -32768 to 32767
int32: ...
int256 --> (int == int256)

uint8: 0 to 255
uint16: 0 to 65535
uint32: ...
uint256 --> (uint == uint256)

You pay for the storage of these values (larger type, higher price but increase in price is not very significant)

<!-- Message Global Variable -->
Account -> Transaction -> Contract Instance (Rinkeby)
'msg' object describes who sent the transaction
`msg.data`: 'Data' field from the call or transaciton that invoked the current function
`msg.gas`: Amount of gas the current function invocation has available
`msg.sender`: Address of the account that started the current function invocation
`msg.value`: Amount of ether (in wei) that has sent along with the function invocation


<!-- Big Solidity Gotcha -->
Solidity World: Allows Nested Dynamic Arrays
ABI/JS/Web3 World: No ability to pull the nested dynamic array from solidity world (No Dice)

Solidity stores strings as dynamic arrays, we cannot transfer arrays of strings from Solidity array!

<!-- Simple React App -->
`sudo npm install -g create-react-app` (By default, doesn't include anything for nagivation, data loading, etc.)
Generate new React project: `npx create-react-app lottery-react`

Additional Steps:
`npm uninstall -g create-react-app`
`rm -rf /usr/local/bin/create-react-app`

Installations:
`npm install web3`
`yarn add web3`

Metamask will always inject web3 v0.20 to any page we are on. Provider --> Rinkeby
Our App will make use of web3 v1.0

Metamask's providers store all the public/private keys under web3 v0.20
Take our version of web3 and hijack into the metamask provider

We are assuming the user has Metamask installed!

Create `src/web3.js` and import into `src/App.js` to inject our version of web3


```
import Web3 from "web3";
window.ethereum.request({ method: "eth_requestAccounts" });
const web3 = new Web3(window.ethereum);
export default web3;
```

<!-- React life cycle -->
1. Component renders
2. componentDidMount called
3. 'Call' methods on contract
4. Set data on 'state'

<!-- Next.js -->
Wraps up React + associated tools into one package
Lots of fancy features included out of the box (Routing, Server side rendering, Hot module reload)
Makes it really, really easy to use React to make a multi-page application

`npm install next react react-dom`
Next.js Routes: `npm install next-routes --legacy-peer-deps`

# Project Directory
.next --> Where the magic happens
pages --> React components that get turned into a visitable webpage

# Todo
1. Configure web3 with a provider from metamask
2. Tell web3 that a deployed copy of the 'CampaignFactory' exists
3. Use Factory instance to retrieve a list of deployed campaigns
4. Use React to show something about each campaign

<!-- Styling Toolkit for React -->
`npm install --save semantic-ui-react`
`npm install --save semantic-ui-css`
