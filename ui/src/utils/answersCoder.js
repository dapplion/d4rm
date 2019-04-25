const charactersInBytes32 = 64;
const hexCharactersPerAnswer = 1;
const maxIndex = 16 ** hexCharactersPerAnswer - 1;

/**
 * Encodes the answers
 *
 * @param {array} answers = [3, 1]
 * @returns {string} bytes32: 0x31000000000000000000...
 */
export function encodeAnswers(answers) {
  const answerIds = Object.values(answers).map(answerIndex => {
    if (isNaN(answerIndex)) throw Error("Answer index must be a number");
    if (answerIndex > maxIndex)
      throw Error(
        `Max number of possible answers for questions is ${maxIndex}`
      );
    return parseInt(answerIndex).toString(16);
  });
  return "0x" + answerIds.join("").padEnd(charactersInBytes32, "0");
}

/**
 * Decodes the answers
 *
 * @param {string} bytes32: 0x31000000000000000000...
 * @returns {array}
 */
export function decodeAnswers(answersBytes32, questions) {
  if (!answersBytes32 || typeof answersBytes32 !== "string")
    throw Error("answersBytes32 must be a string");

  answersBytes32 = answersBytes32.replace("0x", "");
  const parsedAnswers = [];
  for (let i = 0; i < questions.length; i++) {
    const startChar = i * hexCharactersPerAnswer;
    const endChar = startChar + hexCharactersPerAnswer;
    const answerIndexHex = answersBytes32.slice(startChar, endChar);
    const answerIndex = parseInt(answerIndexHex, 16);
    parsedAnswers.push({
      title: questions[i].title,
      answer: questions[i].options[answerIndex],
      answerIndex
    });
  }
  return parsedAnswers;
}
