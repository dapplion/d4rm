const sigUtil = require("eth-sig-util");
const ethUtil = require("ethereumjs-util");

/**
 * Generates a valid signature comforming with Metamask's signedTypedData_v1
 *
 * @param {string} surveyId "0x1da44b586eb0729ff70a73c326926f6ed5a25f5b056e7f47fbc6e58d86871655"
 * @param {string} answers "0x3020000000000000000000000000000000000000000000000000000000000000"
 * @param {string} privateKey "0x1234abcd..."
 * @returns {object} sig = { v, r ,s }
 */
function generateSubmitSig({ surveyId, answers, privateKey }) {
  /**
   * =================================
   * This code below accurately simulates a metamask signature
   * using the method `signTypedData_v1`
   */
  const msgParams = [
    {
      type: "bytes32", // Any valid solidity type
      name: "Survey ID", // Any string label you want
      value: surveyId // The value to sign
    },
    {
      type: "bytes32", // Any valid solidity type
      name: "Answers", // Any string label you want
      value: answers // The value to sign
    }
  ];
  const sig = sigUtil.signTypedData(ethUtil.toBuffer(privateKey), {
    data: msgParams
  });
  const sigParams = ethUtil.fromRpcSig(sig);
  const v = sigParams.v;
  const r = ethUtil.bufferToHex(sigParams.r);
  const s = ethUtil.bufferToHex(sigParams.s);
  return { v, r, s };
}

module.exports = generateSubmitSig;
