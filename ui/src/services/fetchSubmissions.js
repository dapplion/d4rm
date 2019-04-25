import Web3 from "web3";
import sumbitContractAbi from "contracts/SumbitContractAbi.json";

async function fetchSubmissions({ address, questions }) {
  // Parse existing answers
  const web3Local = new Web3("https://rinkeby.infura.io");
  const submitContract = new web3Local.eth.Contract(sumbitContractAbi, address);
  const events = await submitContract.getPastEvents("Submission", {
    fromBlock: "4001171"
  });

  return events.map(event => {
    const answers = (event.returnValues.answers || "").replace("0x", "");
    const parsedAnswers = [];
    for (let i = 0; i < questions.length; i++) {
      const stringPos = i * 2; // 2 hex characters per byte
      const answerIndex = parseInt(answers.slice(stringPos, stringPos + 2), 16);
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
