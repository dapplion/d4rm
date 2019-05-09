const shell = require("./shell");

const networks = ["ropsten", "kovan", "rinkeby", "goerli"];
const deployPath = "deploy/keylessDeploy.js";

deployToAllNetworks();

/**
 * This bash script paralelizes the deploy of a contract
 * to all testnets
 *
 * 1. Deploy to the development network to make sure everything is ok
 * 2. Deploy to all networks at the same time
 */

async function deployToAllNetworks() {
  await Promise.all(
    networks.map(async network => {
      try {
        await shell(`truffle exec ${deployPath} --network ${network}`);
      } catch (e) {
        console.error(`Error deploying on network ${network}: ${e.stack}`);
      }
    })
  );
}
