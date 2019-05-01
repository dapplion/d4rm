import ethSigUtils from "./ethSigUtils";
import { toBuffer } from "ethereumjs-util";
import getMsgParams from "./getMsgParams";

/**
 * Sign the answers using a local account
 *
 * @param {string} privateKey "0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709"
 * @param {string} surveyId "0x1da44b586eb0729ff70a73c326926f6ed5a25f5b056e7f47fbc6e58d86871655"
 * @param {string} answers  "0x3020000000000000000000000000000000000000000000000000000000000000"
 */
export default async function signAnswers({
  privateKey,
  surveyId,
  answersBytes
}) {
  /**
   * =================================
   * This code below accurately simulates a metamask signature
   * using the method `signTypedData_v1`
   */

  const sig = ethSigUtils.signTypedData(toBuffer(privateKey), {
    data: getMsgParams({ surveyId, answersBytes })
  });
  return sig;
}
