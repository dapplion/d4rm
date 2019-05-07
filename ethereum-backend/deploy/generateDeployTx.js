const EthTx = require("ethereumjs-tx");
const ethUtils = require("ethereumjs-util");
const rawTransaction = require("./rawTransaction");

const toHex = address => "0x" + address.toString("hex");

function generateDeployTx(gasLimit) {
  if (gasLimit) rawTransaction.gasLimit = gasLimit;
  const tx = new EthTx(rawTransaction);
  const deployerAddress = toHex(tx.getSenderAddress());
  const contractAddress = toHex(ethUtils.generateAddress(deployerAddress, 0));
  const rawTx = toHex(tx.serialize());
  return {
    sender: ethUtils.toChecksumAddress(deployerAddress),
    contractAddr: ethUtils.toChecksumAddress(contractAddress),
    rawTx
  };
}

module.exports = generateDeployTx;
