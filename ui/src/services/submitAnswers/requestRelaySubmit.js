const baseUrl = "http://localhost:4000";

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
  return fetch(url).then(r => r.json());
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
