require('dotenv').config();
let HDWalletProvider = require("truffle-hdwallet-provider");

let mnemonic = process.env.MNEMONIC;
let ganache = "HTTP://127.0.0.1:8545";
let skale = process.env.SKALE;

module.exports = {
    networks: {
        ganache: {
            provider: () => new HDWalletProvider(mnemonic, ganache),
            gasPrice: 0,
            network_id: "*"
        },
        skale: {
            provider: () => new HDWalletProvider(mnemonic, skale),
            gasPrice: 0,
            network_id: "*"
        }
    }
}