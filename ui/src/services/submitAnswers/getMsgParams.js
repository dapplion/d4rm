/**
 * MUST NOT change the msg params definition
 * The Smart Contract has this values hardcoded
 */

export default function getMsgParams({ surveyId, answersBytes }) {
  return [
    {
      type: "bytes32", // Any valid solidity type
      name: "Survey ID", // Any string label you want
      value: surveyId // The value to sign
    },
    {
      type: "bytes32",
      name: "Answers",
      value: answersBytes
    }
  ];
}
