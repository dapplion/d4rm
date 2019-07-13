const baseUrl = "https://d4rm.tk:8080";

export default function requestRelaySubmit({
  sig,
  userAddress,
  contractAddress,
  surveyId,
  answersBytes
}) {
  const relayParams = {
    sig,
    userAddress,
    contractAddress,
    surveyId,
    answersBytes
  };
  const url = getRelayUrl(baseUrl, relayParams);
  console.log(`Submitting to relay: ${url}`);
  // The submit endPoint response the txHash as plain text
  return fetch(url)
    .then(r => r.text())
    .then(txHash => {
      console.log(`Relay response: ${txHash}`);
      return txHash;
    });
}

// Utils

export function getRelayUrl(baseUrl, relayParams) {
  const relayUrl = new URL(baseUrl);
  relayUrl.pathname = "/submit/";
  Object.entries(relayParams).forEach(([key, val]) => {
    relayUrl.searchParams.set(key, val);
  });
  return relayUrl.toString();
}
