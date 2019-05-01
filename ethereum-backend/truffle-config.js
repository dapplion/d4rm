const fs = require("fs");
const PrivateKeyProvider = require("truffle-privatekey-provider");

const projectId = "89b12e3b00cf40f5ae26cc72b3284a44";
const privateKeyPath = ".privateKey"; // MUST .gitignore this file

const providerGenerator = network =>
  new PrivateKeyProvider(
    readFileSafe(privateKeyPath),
    `https://${network}.infura.io/v3/${projectId}`
  );

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "5777" // Any network (default: none)
    },

    ropsten: {
      provider: providerGenerator("ropsten"),
      network_id: 3
    },

    kovan: {
      provider: providerGenerator("kovan"),
      network_id: 42
    },

    rinkeby: {
      provider: providerGenerator("rinkeby"),
      network_id: 4
    },

    goerli: {
      provider: providerGenerator("goerli"),
      network_id: 5
    }
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.3+commit.10d17f24", // Must be an exact version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        evmVersion: "byzantium"
      }
    }
  }
};

// Utils,

function readFileSafe(path) {
  try {
    return fs.readFileSync(path, "utf8");
  } catch (e) {
    return null;
  }
}
