const { promisify } = require("util");
const truffleFlattener = require("truffle-flattener");
const request = require("request");
const generateDeployTx = require("./generateDeployTx");
const rawTransaction = require("./rawTransaction");
const pause = require("./pause");
const { getEtherscanApiUrl, getEtherscanUrl } = require("./etherscanData");

const apikey = "2GTVV7HHTK8CCG2NFK5NRXYPY6DKINJH48"; //A valid API-Key is required

/**
 *
 * @param {string} contract "DelegatedPublicFormSubmission"
 * @param {string} network "ropsten"
 */
async function verifyOnEtherscan(contract) {
  const ContractArtifacts = artifacts.require(contract);

  // Get address from an existing deploy
  const network = await web3.eth.net.getNetworkType(); // "private", "kovan"
  const contractInstance = await ContractArtifacts.deployed();
  const contractaddress = contractInstance.address;

  if (await isContractVerified(contractaddress, network)) {
    return console.log(`Contract ${contractaddress} is already verified`);
  }

  // Get config data
  const metadata = JSON.parse(ContractArtifacts.metadata);
  const compilerversion = "v" + metadata.compiler.version;
  const optimizationEnabled = metadata.settings.optimizer.enabled;
  const optimizationRuns = metadata.settings.optimizer.runs;

  // Get contract data
  // Source code must be flattened
  const sourceCode = await truffleFlattener([`contracts/${contract}.sol`]);
  const contractname = ContractArtifacts.contractName;

  try {
    console.log("verifying...");
    /**
     * Only POST supported
     * Set to the  correct API url for Other Networks
     * [NOTE!] data must be of type 'application/x-www-form-urlencoded'
     * `axios` has trouble supporting this method. Use request instead
     *
     * - On success
     *   response = {
     *     status: "1",
     *     message: "OK",
     *     result: "tbvbk55lzaifxmecfxnapggy89gjaxjbg9lm7cxyaduryhgdve"
     *   };
     */
    const { status, result } = await promisify(request.post)({
      url: getEtherscanApiUrl(network),
      form: {
        apikey,
        module: "contract", // Do not change
        action: "verifysourcecode", // Do not change
        contractaddress,
        sourceCode,
        contractname, //ContractName
        compilerversion, // see http://etherscan.io/solcversions for list of support versions
        optimizationUsed: optimizationEnabled ? 0 : 1, //0 = Optimization used, 1 = No Optimization
        runs: optimizationRuns //set to 200 as default unless otherwise
        // constructorArguements: null // N/A
      }
    }).then(res => JSON.parse(res.body));

    const guid = status !== "0" ? result : null;
    const error = status === "0" ? result : null;
    if (error) throw Error(`Etherscan API ${error}`);

    while (true) {
      const { pending, success } = await checkVerificationStatus(guid, network);
      if (pending) console.log("Verification pending...");
      if (success) {
        console.log("Successfully verified!");
        console.log(
          `${getEtherscanUrl(network)}/address/${contractaddress}#code`
        );
        return;
      }
      await pause(1000);
    }
  } catch (error) {
    console.log("Error on verifyOnEtherscan");
    console.log(error);
  }
}

async function isContractVerified(contractAddress, network) {
  /**
   * - On error
   *   response = {
   *     status: "0",
   *     message: "NOTOK",
   *     result: "Contract source code not verified"
   *   };
   */
  const etherscanApiUrl = getEtherscanApiUrl(network);
  const response = await promisify(request)(
    `${etherscanApiUrl}?module=contract&action=getabi&address=${contractAddress}`
  ).then(res => JSON.parse(res.body));
  return response.status !== "0";
}

/**
 *
 * @param {string} guid "ezq878u486pzijkvvmerl6a9mzwhv6sefgvqi5tkwceejc7tvn"
 */
async function checkVerificationStatus(guid, network) {
  /**
   * - If verification pending:
   *   { status: '0', message: 'NOTOK', result: 'Pending in queue' }
   * - If verification failed:
   *   { status: '0', message: 'NOTOK', result: 'Fail - Unable to verify' }
   */
  const { status, result } = await promisify(request.get)({
    url: getEtherscanApiUrl(network),
    form: {
      guid,
      module: "contract",
      action: "checkverifystatus"
    }
  }).then(res => JSON.parse(res.body));

  if (status === "0") {
    if (result.toLowerCase().includes("pending")) return { pending: true };
    else throw Error(`Etherscan API Verification ${result}`);
  } else {
    console.log({ result });
    return { success };
  }
}

module.exports = function(callback) {
  verifyOnEtherscan("DelegatedPublicFormSubmission")
    .then(res => callback(null, res))
    .catch(err => callback(err));
};
