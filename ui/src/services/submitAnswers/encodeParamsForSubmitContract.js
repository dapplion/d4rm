import { fromRpcSig, bufferToHex } from "ethereumjs-util";
import validateSignedAnswers from "./validateSignedAnswers";

export default function encodeParamsForSubmitContract({
  sig,
  address,
  surveyId,
  answersBytes
}) {
  /**
   * Validate the signature
   */

  const sigParams = fromRpcSig(sig);

  const r = bufferToHex(sigParams.r);
  const s = bufferToHex(sigParams.s);
  const v = sigParams.v;

  return [surveyId, answersBytes, address, r, s, v];

  // const result = await delegatedPublicFormSubmission.delegatedSubmit(
  //   surveyId,
  //   answers,
  //   address,
  //   r,
  //   s,
  //   v
  // );
}
