import Web3 from "web3";
import sumbitContractAbi from "contracts/SumbitContractAbi.json";
import { encodeAnswers } from "utils/answersCoder";
import hashToBytes32 from "utils/hashToBytes32";
import { getEthProviderUrl } from "utils/getProviderUrl";

async function submitAnswers({ answers, submit, hash }) {
  if (!hash) throw Error("hash must be defined");

  /**
   * Only one method is supported, via rinkeby
   */

  if (submit.to !== "smartContract") throw Error("Unsupported submit method");

  const result = await submitToSmartContract({
    surveyId: hashToBytes32(hash),
    answerBytes: encodeAnswers(answers),
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
  const providerUrl = getEthProviderUrl(network);
  const web3 = new Web3(providerUrl);
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

  // Verify that the metamask network is correct
  const metamaskNetId = window.ethereum.networkVersion; // > "5"
  const web3NetId = await web3.eth.net.getId().then(String);
  if (metamaskNetId && web3NetId && metamaskNetId !== web3NetId) {
    console.log({ metamaskNetId, web3NetId });
    throw Error(`Please change metamask network to ${network}`);
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
