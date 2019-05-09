require("dotenv").config();
const express = require("express");
const app = express();
const Web3 = require("web3");
const web3Utils = require("web3-utils");
const { toBN } = web3Utils;
// Utils
const wrapErrors = require("./utils/wrapErrors");
const isBytes32 = require("./utils/isBytes32");
const ethUtil = require("ethereumjs-util");
const delegatedPublicFormSubmissionAbi = require("./delegatedPublicFormSubmissionAbi.json");

/**
 * DR4M relay
 * The request must be:
 * 'GET' to 'http://path.to.faucet/submit/' + query
 */

/* eslint-disable no-console */

// Faucet parameters (edit)
const gasPriceGwei = 1;
const gasLimit = 50000; // Only ETH transaction
const chainId = 5; // Goerli
const chainName = "goerli";
const privateKey = process.env.PRIVATE_KEY;
const projectId = "89b12e3b00cf40f5ae26cc72b3284a44";
const web3Provider =
  process.env.WEB3_PROVIDER || `https://${chainName}.infura.io/v3/${projectId}`;

// Api parameters (careful editing)
const port = process.env.port || 3000;

// ===================================
// ====== (do not edit below) ========
// ===================================

const signCache = {};

// Initialize web3 instance, use HTTP to avoid reconnection errors, speed is not critical
const web3 = new Web3(web3Provider);

// Compute private key and address
if (!privateKey)
  throw Error(
    "You must provide an ENV variable PRIVATE_KEY=842b0041... You can use a .env file too"
  );
const senderPrivateKey = "0x" + privateKey.replace("0x", "");
const senderAddress = web3.eth.accounts.privateKeyToAccount(senderPrivateKey)
  .address;

// Parameter unit conversion (do not edit)
const gasPriceWei = web3Utils.toWei(String(gasPriceGwei), "gwei");
const valueSentPerTxWeiBn = toBN(gasLimit).mul(toBN(gasPriceWei));
console.log("Faucet params");
console.log({ gasPriceWei });

/**
 * Declare routes:
 * - "/"
 * - "/status"
 * - "/submit"
 */

app.get("/", (_, res) => res.send("D4RM relay"));

app.get(
  "/status",
  wrapErrors(async (_, res) => {
    const faucetStatus = await getFaucetStatus();
    res.json(faucetStatus);
  })
);

app.get(
  "/submit",
  wrapErrors(async (req, res) => {
    // Compute parameters
    const {
      sig,
      userAddress,
      contractAddress,
      surveyId,
      answersBytes,
      network
    } = req.query;

    // Reject already seen signatures
    if (signCache[sig]) throw Error("Signature already processed");

    console.log(req.query);

    // Verify params
    if (!userAddress || !web3Utils.isAddress(userAddress))
      throw Error("userAddress must be valid");
    if (!contractAddress || !web3Utils.isAddress(contractAddress))
      throw Error("contractAddress must be valid");
    if (!surveyId || !isBytes32(surveyId))
      throw Error("surveyId must be valid");
    if (!answersBytes || !isBytes32(answersBytes))
      throw Error("answersBytes must be valid");

    console.log(`Incoming relay request at ${Date()}`);
    console.log({
      sig,
      userAddress,
      contractAddress,
      surveyId,
      answersBytes,
      network
    });

    /**
     * Prepare TX data
     */
    const sigParams = ethUtil.fromRpcSig(sig);
    const v = sigParams.v;
    const r = ethUtil.bufferToHex(sigParams.r);
    const s = ethUtil.bufferToHex(sigParams.s);
    const delegatedPublicFormSubmission = new web3.eth.Contract(
      delegatedPublicFormSubmissionAbi,
      contractAddress
    );
    const data = delegatedPublicFormSubmission.methods
      .delegatedSubmit(surveyId, answersBytes, userAddress, r, s, v)
      .encodeABI();

    // Prepare tx
    // Web3 method takes care of the nonce, chainId and gasPrice automatically
    // https://web3js.readthedocs.io/en/1.0/web3-eth-accounts.html#signtransaction
    const tx = await web3.eth.accounts.signTransaction(
      {
        to: contractAddress,
        gasLimit: gasLimit,
        data
      },
      senderPrivateKey
    );

    // Broadcast tx
    const rawTx = tx.rawTransaction;
    // Using .sendSignedTransaction as a promise resolves on the receipt when mined.
    // For this application it needs the tx hash ASAP, so the event form is used
    web3.eth.sendSignedTransaction(rawTx).on("transactionHash", hash => {
      const etherscanTxLink = `https://${chainName}.etherscan.io/tx/${hash}`;
      console.log(
        `Broadcasted a delegatedSubmit for ${userAddress}: ${etherscanTxLink}`
      );
      res.json({ hash, url: etherscanTxLink });
    });
  })
);

// Start API
app.listen(port);
console.log(`App listening at port ${port}`);

// Make sure the provided address has sufficient balance
verifyFaucet();
async function verifyFaucet() {
  // Check network status
  const nodeNetworkId = await web3.eth.net.getId();
  const isListening = await web3.eth.net.isListening();
  if (nodeNetworkId != chainId)
    throw Error(`WARNING nodeNetworkId ${nodeNetworkId} != chainId ${chainId}`);
  console.log(
    `Connected to ${web3Provider}, isListening: ${isListening}, nodeNetworkId: ${nodeNetworkId}`
  );

  // Check the faucet stats
  const faucetStatus = await getFaucetStatus();
  console.log("faucet status \n", faucetStatus);
}

// Modularize to be used on startup and on the /status/ route
async function getFaucetStatus() {
  const blockNumber = await web3.eth.getBlockNumber();
  const faucetBalance = await web3.eth.getBalance(senderAddress);
  const faucetBalanceBn = toBN(faucetBalance);
  return {
    blockNumber,
    faucetBalance: web3Utils.fromWei(faucetBalance),
    faucetAddress: senderAddress,
    // Round downwards, if refillsLeft < 1, the faucet is dead
    refillsLeft: parseInt(faucetBalanceBn.div(valueSentPerTxWeiBn).toString(10))
  };
}
