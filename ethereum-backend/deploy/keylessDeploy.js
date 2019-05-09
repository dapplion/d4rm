const fs = require("fs");
const rawTransaction = require("./rawTransaction");
const waitForTx = require("./waitForTx");
const generateDeployTx = require("./generateDeployTx");
const { getEtherscanUrl } = require("./etherscanData");
const truffleFlattener = require("truffle-flattener");

const toBN = web3.utils.toBN;

async function deploy(contractId) {
  const ContractArtifacts = artifacts.require(contractId);
  const network_id = ContractArtifacts.network_id;

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

  // Write truffle artifacts
  const artifactsJson = ContractArtifacts._json;
  artifactsJson.networks[String(network_id)] = {
    events: {},
    links: {},
    address: contractAddr,
    transactionHash: fundTx.transactionHash
  };
  fs.writeFileSync(
    `build/contracts/${contractId}.json`,
    JSON.stringify(artifactsJson, null, 2)
  );

  // Log info to valide source on etherscan
  // Get config data
  const metadata = JSON.parse(ContractArtifacts.metadata);
  const compilerversion = "v" + metadata.compiler.version;
  const optimizationEnabled = metadata.settings.optimizer.enabled;
  const optimizationRuns = metadata.settings.optimizer.runs;
  const sourceCode = await truffleFlattener([`contracts/${contractId}.sol`]);

  console.log(`
  
  Info to verify contract in etherscan.
  Flattened source code:

=========================================================
=========================================================
${sourceCode}
=========================================================
=========================================================

  compilerversion:     ${compilerversion}
  optimizationEnabled: ${optimizationEnabled}
  optimizationRuns:    ${optimizationRuns}

  Go to: ${getEtherscanUrl(network_id)}/address/${contractAddr}#code
  `);

  // Log results
  console.log(`Successfully deployed contract 
    address: ${contractAddr}
    txHash: ${fundTx.transactionHash}
    link: ${getEtherscanUrl(network_id)}/tx/${fundTx.transactionHash}
  `);

  return contractAddr;
}

module.exports = function(callback) {
  deploy("DelegatedPublicFormSubmission")
    .then(res => callback(null, res))
    .catch(err => callback(err));
};
