import { getEthProviderUrl } from "utils/getUrlProvider";
import Web3 from "web3";
// Abis
import sumbitContractAbi from "contracts/sumbitContractAbi.json";

/**
 * Wrapper for interacting with web3 methods
 */

let web3InstancesCache = {};
function getWeb3(network, withMetamask) {
  const networkId = `${network}-${withMetamask}`;
  if (!network) throw Error("network must be defined");
  if (!web3InstancesCache[networkId]) {
    if (withMetamask) {
      web3InstancesCache[networkId] = new Web3(window.ethereum);
    } else {
      const providerUrl = getEthProviderUrl(network);
      web3InstancesCache[networkId] = new Web3(providerUrl);
    }
  }
  return web3InstancesCache[networkId];
}

export function getBalance(address, network) {
  if (!isAddress(address)) throw Error(`address is not valid: ${address}`);
  const web3 = getWeb3(network);
  return web3.eth.getBalance(address);
}

export function getSubmitContract({ address, network, withMetamask }) {
  if (!isAddress(address)) throw Error(`address is not valid: ${address}`);
  const web3 = getWeb3(network, withMetamask);
  return new web3.eth.Contract(sumbitContractAbi, address);
}

// Utils

export function isAddress(address) {
  return Web3.utils.isAddress(address);
}
