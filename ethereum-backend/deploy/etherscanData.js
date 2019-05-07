const etherscanApiUrls = {
  mainnet: "https://api.etherscan.io/api",
  ropsten: "https://api-ropsten.etherscan.io/api",
  rinkeby: "https://api-rinkeby.etherscan.io/api",
  goerli: "https://api-goerli.etherscan.io/api",
  kovan: "https://api-kovan.etherscan.io/api"
};

const etherscanUrls = {
  mainnet: "https://etherscan.io",
  ropsten: "https://ropsten.etherscan.io",
  rinkeby: "https://rinkeby.etherscan.io",
  goerli: "https://goerli.etherscan.io",
  kovan: "https://kovan.etherscan.io"
};

const networkIds = {
  "1": "mainnet",
  "3": "ropsten",
  "4": "rinkeby",
  "5": "goerli",
  "42": "kovan"
};

function parseNetwork(network) {
  if (!network) throw Error("network must be defined");
  // Convert network IDs numbers to strings
  network = String(network);
  // Accepts "3" and "ropsten"
  if (networkIds[network]) network = networkIds[network];
  else if (!Object.values(networkIds).includes(network))
    throw Error(`network not supported: ${network}`);
  return network;
}

function getEtherscanApiUrl(network) {
  return etherscanApiUrls[parseNetwork(network)];
}

function getEtherscanUrl(network) {
  return etherscanUrls[parseNetwork(network)];
}

module.exports = {
  getEtherscanApiUrl,
  getEtherscanUrl
};
