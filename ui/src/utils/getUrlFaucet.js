const faucetUrl = {
  ropsten: () => "https://faucet.ropsten.be/",
  kovan: () => "https://faucet.kovan.network/",
  rinkeby: () => "https://faucet.rinkeby.io/",
  goerli: address =>
    address
      ? `https://goerli-faucet.slock.it/?address=${address}`
      : "https://goerli-faucet.slock.it/"
};

export default function getUrlFaucet(network, address) {
  if (!faucetUrl[network]) throw Error(`Unsupported network: ${network}`);
  return faucetUrl[network](address);
}
