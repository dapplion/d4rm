const projectId = "89b12e3b00cf40f5ae26cc72b3284a44";

export function getEthProviderUrl(network) {
  return `https://${network}.infura.io/v3/${projectId}`;
}

export function getIpfsProviderUrl() {
  return "ipfs.infura.io";
}
