export function getContractUrl(network, address) {
  return `https://${network}.etherscan.io/address/${address}`;
}

export function getTxUrl(network, txHash) {
  return `https://${network}.etherscan.io/tx/${txHash}`;
}
