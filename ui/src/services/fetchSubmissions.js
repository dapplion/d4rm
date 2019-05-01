import { decodeAnswers } from "utils/answersCoder";
import hashToBytes32 from "utils/hashToBytes32";
import { getSubmitContract } from "services/ethereumMethods";

async function fetchSubmissions({ hash, network, address, questions }) {
  const surveyId = hashToBytes32(hash);

  // Parse existing answers
  const submitContract = getSubmitContract({ address, network });
  const events = await submitContract.getPastEvents("Submission", {
    filter: { surveyId },
    fromBlock: "0"
  });
  console.log(`events at submission contract ${network} ${address}`, events);

  return events.map(event => {
    const answersBytes32 = event.returnValues.answers || "";
    const parsedAnswers = decodeAnswers(answersBytes32, questions);

    return {
      answers: parsedAnswers,
      txHash: event.transactionHash,
      user: event.returnValues.user
    };
  });
}

export default fetchSubmissions;
