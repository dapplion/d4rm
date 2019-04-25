import Web3 from "web3";
import sumbitContractAbi from "contracts/SumbitContractAbi.json";
import CID from "cids";

function hashToBytes32(hash) {
  const cid = new CID(hash);
  return (
    "0x" +
    cid.multihash
      .slice(2, 64)
      .toString("hex")
      .padStart(64, "0")
  );
}

async function submitAnswers({ answers, submit, hash }) {
  if (!hash) throw Error("hash must be defined");

  const answerIds = Object.values(answers).map(answerIndex => {
    if (isNaN(answerIndex)) throw Error("Answer index must be a number");
    if (answerIndex > 15)
      throw Error("Max number of possible answers for questions is 15");
    return parseInt(answerIndex).toString(16);
  });
  const answerBytes = "0x" + answerIds.join("").padEnd(64, "0");

  /**
   * Only one method is supported, via rinkeby
   */

  if (submit.to !== "smartContract") throw Error("Unsupported submit method");

  const result = await submitToSmartContract({
    surveyId: hashToBytes32(hash),
    answerBytes,
    address: submit.address,
    network: submit.network
  });
  return (result || {}).result;
}

async function submitToSmartContract({
  surveyId,
  answerBytes,
  address,
  network
}) {
  if (!window.ethereum)
    throw Error("You must have a recent version of metamask installed");

  console.log("Submitting answers to smart contract", {
    surveyId,
    answerBytes,
    address,
    network
  });

  await window.ethereum.enable();
  const web3 = new Web3(`https://${network}.infura.io`);
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
  const data = submitContract.methods.submit(surveyId, answerBytes).encodeABI();
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
