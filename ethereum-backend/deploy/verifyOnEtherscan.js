const fs = require("fs");

const apiKey = "2GTVV7HHTK8CCG2NFK5NRXYPY6DKINJH48", //A valid API-Key is required

const DelegatedPublicFormSubmission = require("../build/contracts/DelegatedPublicFormSubmission.json");

// Get config data
const metadata = JSON.parse(DelegatedPublicFormSubmission.metadata);
const compilerversion = metadata.compiler.version;
const optimizationEnabled = metadata.settings.optimizer.enabled;
const optimizationRuns = metadata.settings.optimizer.runs;

// Get contract data
const sourceCode = DelegatedPublicFormSubmission.deployedBytecode;
const contractName = DelegatedPublicFormSubmission.contractName;

// Get address from deployed instance in development
const developmentDeploy = DelegatedPublicFormSubmission.networks["5777"];
if (!developmentDeploy) throw Error("Could not find a development deploy");
const contractaddress = developmentDeploy.address;

console.log(DelegatedPublicFormSubmission);

const etherscanApi = "https://api.etherscan.io/api";
const contractData = data[0];
var data = {
  apikey,
  module: "contract", // Do not change
  action: "verifysourcecode", // Do not change
  contractaddress,
  sourceCode,
  contractname: contractData.sources.target.split("/").pop(), //ContractName
  compilerversion: solc.version, // see http://etherscan.io/solcversions for list of support versions
  optimizationUsed: optimizer.enabled ? 0 : 1, //0 = Optimization used, 1 = No Optimization
  runs: optimizer.runs, //set to 200 as default unless otherwise
  constructorArguements: null
};
try {
  const response = await fetch(analysisServerUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(data)
  });
  console.log(response);
  cb(response);
} catch (error) {
  console.log(error);
}
