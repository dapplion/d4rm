import signIn from "services/signIn";
import delegateOrFaucetDialog from "./delegateOrFaucetDialog";
import { getBalance, getSubmitContract } from "services/ethereumMethods";
import signAnswers from "./signAnswers";
import signAnswersWithMetamask from "./signAnswersWithMetamask";
import validateSignature from "./validateSignature";
import requestRelaySubmit from "./requestRelaySubmit";
// Utils
import { encodeAnswers } from "utils/answersCoder";
import hashToBytes32 from "utils/hashToBytes32";

/**
 * The goal of this module is to submit user's answers
 * It encapsulates all the logic of:
 * - Getting the user account
 * - Deciding the submission method
 * - Handling the transaction
 */

export default async function submitAnswers({ answers, submit, hash }) {
  const { network } = submit;
  console.log("Submitting answers", { answers, submit });

  /**
   * @param {object} account = {
   *   address: {string} "0x1234abcd...",
   *   privateKey: {string} "0x9876fedc...", (only on localAccount)
   *   isMetamask: {bool} true / false
   * }
   */
  const account = await signIn();
  console.log("Submitting answers: Got account", { account });

  let useDelegateSubmit;
  if (account.isMetamask) {
    const userBalance = await getBalance(account.address, network); // returns {string}
    if (userBalance === "0") {
      //
      /**
       * Ask user to get funds, or use delegate
       * - If chooses to get funds, an error will be thrown to stop the process
       * - If chooses to delegate, the function will return true
       */
      useDelegateSubmit = await delegateOrFaucetDialog({
        network,
        address: account.address
      });
    } else {
      useDelegateSubmit = false;
    }
  } else {
    useDelegateSubmit = true;
  }

  //   // Verify that the metamask network is correct
  //   const metamaskNegetSubmitContracttId = ethereum.networkVersion; // > "5"
  //   const web3NetId = await web3.eth.net.getId().then(String);
  //   if (metamaskNetId && web3NetId && metamaskNetId !== web3NetId) {
  //     console.log({ metamaskNetId, web3NetId });
  //     throw Error(`Please change metamask network to ${network}`);
  //   }

  // Encode parameters
  const answersBytes = encodeAnswers(answers);
  const surveyId = hashToBytes32(hash);

  let txHash;
  if (useDelegateSubmit) {
    txHash = await delegateSubmit({ submit, account, surveyId, answersBytes });
  } else {
    // Directly submit to contract
    txHash = await directSubmit({
      submit,
      network,
      account,
      surveyId,
      answersBytes
    });
  }
  console.log("submitAnswers result", txHash);
  return txHash;
}

async function delegateSubmit({ submit, account, surveyId, answersBytes }) {
  // Get the signature
  const sig = account.isMetamask
    ? await signAnswersWithMetamask({
        address: account.address,
        surveyId,
        answersBytes
      })
    : await signAnswers({
        privateKey: account.privateKey,
        surveyId,
        answersBytes
      });

  // Will throw if the signature is not correct
  validateSignature({
    sig,
    address: account.address,
    surveyId,
    answersBytes
  });

  // Post data to relay
  const relayParams = {
    sig,
    userAddress: account.address,
    contractAddress: submit.address,
    surveyId,
    answersBytes
  };
  const txHash = await requestRelaySubmit(relayParams);
  console.log(`Successfully submitted to relay`, txHash);
  return txHash;
}

function directSubmit({ submit, network, account, surveyId, answersBytes }) {
  console.log("Attempting directSubmit");
  const submitContract = getSubmitContract({
    address: submit.address,
    network,
    withMetamask: account.isMetamask
  });
  return new Promise((resolve, reject) => {
    submitContract.methods
      .submit(surveyId, answersBytes)
      .send({ from: account.address }, (error, transactionHash) => {
        console.log(`Direct submit response`, error, transactionHash);
        if (error) reject(Error(error.message || error));
        else resolve(transactionHash);
      });
  });
}
