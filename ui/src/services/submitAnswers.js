import Web3 from "web3";
import sumbitContractAbi from "contracts/SumbitContractAbi.json";

async function submitAnswers({ answers, submit }) {
  const answerIds = Object.values(answers).map(answerIndex => {
    if (isNaN(answerIndex)) throw Error("Answer index must be a number");
    if (answerIndex > 255)
      throw Error("Max number of possible answers for questions is 255");
    return parseInt(answerIndex)
      .toString(16)
      .padStart(2, "0");
  });
  const answerBytes = "0x" + answerIds.join("");
  console.log({ answerBytes, submit });

  /**
   * Only one method is supported, via rinkeby
   */

  if (submit.to !== "rinkeby") {
    const result = await submitToSmartContract({
      answerBytes,
      address: submit.address
    });
    return (result || {}).result;
  } else throw Error("Unsupported submit method");
}

async function submitToSmartContract({ answerBytes, address }) {
  if (!window.ethereum)
    throw Error("You must have a recent version of metamask installed");

  await window.ethereum.enable();
  const web3 = new Web3("https://rinkeby.infura.io");
  // Check addresses
  if (!web3.utils.isAddress(window.ethereum.selectedAddress)) {
    throw Error(
      `Could not get address from window.ethereum.selectedAddress ${
        window.ethereum.selectedAddress
      }`
    );
  }
  if (!web3.utils.isAddress(address)) {
    throw Error(`Submit address is not valid: ${address}`);
  }

  const submitContract = new web3.eth.Contract(sumbitContractAbi, address);
  const data = submitContract.methods.submit(answerBytes).encodeABI();
  const transactionParameters = {
    to: address,
    from: window.ethereum.selectedAddress,
    data
  };

  async function sendAsync() {
    return new Promise((resolve, reject) => {
      window.ethereum.sendAsync(
        {
          method: "eth_sendTransaction",
          params: [transactionParameters],
          from: window.ethereum.selectedAddress
        },
        function(err, result) {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  }
  return await sendAsync();
}

export default submitAnswers;
