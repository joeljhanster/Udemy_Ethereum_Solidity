Bring your proejct up to date with the latest Solc v0.8.9

1. `mkdir inbox-updated`
2. `cd inbox-updated`
3. `npm init`
4. `npm install solc web3 mocha ganache-cli @truffle/hdwaller-provider`
5. Update your test script in the `package.json` file to be `"test": "mocha"`
6. Copy your contracts directory (containing `Inbox.sol`), test directory (containing `Inbox.test.js`), `compile.js`, and `deploy.js` into the new `inbox-updated` project directory

