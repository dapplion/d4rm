import recoverFromSignedAnswers from "./recoverFromSignedAnswers";

export default function validateSignature({
  sig,
  surveyId,
  answersBytes,
  address
}) {
  const recoveredAddress = recoverFromSignedAnswers({
    sig,
    surveyId,
    answersBytes
  });

  if (recoveredAddress.toLowerCase() !== address.toLowerCase())
    throw Error("Signature is not correct");
}
