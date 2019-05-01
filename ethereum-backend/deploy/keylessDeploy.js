const EthTx = require("ethereumjs-tx");
const ethUtils = require("ethereumjs-util");
const rawTransaction = require("./rawTransaction");
const waitForTx = require("./waitForTx");

const toHex = address => "0x" + address.toString("hex");
const toBN = web3.utils.toBN;

generateDeployTx = gasLimit => {
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
};

async function deploy() {
  const gasEstimate = await web3.eth.estimateGas({
    data: rawTransaction.data
  });
  console.log(`Estimated contract deploy cost to: ${gasEstimate} gas`);

  const { sender, contractAddr, rawTx } = generateDeployTx(gasEstimate);

  const deployedCode = await web3.eth.getCode(contractAddr);

  if (deployedCode.length > 3) {
    console.log("WARNING: Contract already deployed, aborting deploy");
    return contractAddr;
  }

  /**
   * Send the exact value necessary to deploy the contract
   */

  const value = toBN(rawTransaction.gasPrice).mul(toBN(gasEstimate));

  console.log(`Funding deploy account ${sender}...`);
  const accounts = await web3.eth.getAccounts();
  const fundTx = await web3.eth.sendTransaction({
    from: accounts[0],
    to: sender,
    value
  });
  await waitForTx(fundTx.transactionHash, web3);
  console.log(`Funded deploy account ${sender} with ${web3.utils.fromWei(
    value
  )} ETH
    txHash: ${fundTx.transactionHash}
  `);

  console.log(`Deploying contract ${contractAddr}...`);
  const deployTx = await web3.eth.sendSignedTransaction(rawTx);
  await waitForTx(deployTx.transactionHash, web3);
  console.log(`Successfully deployed contract 
    address: ${contractAddr}
    txHash: ${fundTx.transactionHash}
  `);

  return contractAddr;
}

module.exports = function(callback) {
  deploy()
    .then(res => callback(null, res))
    .catch(err => callback(err));
};
