const crypto = require("crypto");
const ethUtil = require("ethereumjs-util");

/**
 * Generates random valid submit data to feed the tests
 *
 * @returns {object} {
 *   surveyId: "0x1da44b586eb0729ff70a73c326926f6ed5a25f5b056e7f47fbc6e58d86871655"
 *   answers: "0x3020000000000000000000000000000000000000000000000000000000000000"
 * }
 */
function randomSubmitData() {
  const surveyId = ethUtil.bufferToHex(crypto.randomBytes(32));
  const answers = web3.eth.abi.encodeParameter("bytes32", "0x302");

  return { surveyId, answers };
}

module.exports = randomSubmitData;
