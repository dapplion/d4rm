const DelegatedPublicFormSubmission = require("../build/contracts/DelegatedPublicFormSubmission.json");

/**
 * Truffle stored the bytecode to be deployed in the property "bytecode"
 * The "deployedBytecode" is the runtime bytecode, not applicable here
 */
const rawTransaction = {
  nonce: 0,
  gasPrice: 10e9,
  value: 0,
  data: DelegatedPublicFormSubmission.bytecode,
  gasLimit: null,
  v: 27,
  r: "0x4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d",
  s: "0x4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d"
};

module.exports = rawTransaction;
