const pause = require("./pause");

async function waitForTx(txHash, web3, interval = 1000) {
  while (true) {
    const receipt = await web3.eth.getTransactionReceipt(txHash);
    if (receipt) return receipt;
    await pause(interval);
  }
}

module.exports = waitForTx;
