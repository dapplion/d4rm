import Web3 from "web3";
import { decodeAnswers } from "utils/answersCoder";
import sumbitContractAbi from "contracts/SumbitContractAbi.json";
import hashToBytes32 from "utils/hashToBytes32";
import { getEthProviderUrl } from "utils/getProviderUrl";

async function fetchSubmissions({ hash, network, address, questions }) {
  const surveyId = hashToBytes32(hash);

  // Parse existing answers
  const providerUrl = getEthProviderUrl(network);
  const web3Local = new Web3(providerUrl);
  const submitContract = new web3Local.eth.Contract(sumbitContractAbi, address);
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
