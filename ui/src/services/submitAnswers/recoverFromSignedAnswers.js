import { recoverTypedSignature } from "./ethSigUtils";
import { toChecksumAddress } from "ethereumjs-util";
import getMsgParams from "./getMsgParams";

/**
 * Use to validate metamask signatures,
 * to ensure the method is the same as the one in the Smart Contract
 *
 * @param {string} sig "0xa53832b8892fc642669f5bc3dbefa66814160ade12f5187db131031f8013652b7cef7bc5752cf90ef3abf8ed898df2b6a65c3735c3693b0cf379e5738f3e1a301b"
 * @param {string} msgParams = [
 *   { type: "bytes32", name: "Survey ID", value: surveyId },
 *   { type: "bytes32", name: "Answers", value: answers }
 * ]
 */
export default function recoverFromSignedAnswers({
  sig,
  surveyId,
  answersBytes
}) {
  const recoveredAddress = recoverTypedSignature({
    data: getMsgParams({ surveyId, answersBytes }),
    sig
  });
  return toChecksumAddress(recoveredAddress);
}
