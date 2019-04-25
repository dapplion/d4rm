import Web3 from "web3";
import sumbitContractAbi from "contracts/SumbitContractAbi.json";

const hexCharactersPerAnswer = 1;

async function fetchSubmissions({ network, address, questions }) {
  // Parse existing answers
  const web3Local = new Web3(
    `https://${network}.infura.io/v3/89b12e3b00cf40f5ae26cc72b3284a44`
  );
  const submitContract = new web3Local.eth.Contract(sumbitContractAbi, address);
  const events = await submitContract.getPastEvents("Submission", {
    fromBlock: "0"
  });
  console.log(`events at submission contract ${network} ${address}`, events);

  return events.map(event => {
    const answers = (event.returnValues.answers || "").replace("0x", "");
    const parsedAnswers = [];
    for (let i = 0; i < questions.length; i++) {
      const stringPos = i * hexCharactersPerAnswer; // 1 hex characters per answer
      const answerIndex = parseInt(
        answers.slice(stringPos, stringPos + hexCharactersPerAnswer),
        16
      );
      parsedAnswers.push({
        title: questions[i].title,
        answer: questions[i].options[answerIndex],
        answerIndex
      });
    }
    return {
      answers: parsedAnswers,
      txHash: event.transactionHash,
      user: event.returnValues.user
    };
  });
}

export default fetchSubmissions;
