import { getRelayUrl } from "../../../services/submitAnswers/requestRelaySubmit";

describe("services > requestRelaySubmit, make GET req", () => {
  const sig =
    "0x49bd073dd0c2400fe94eb75efdb814c38d6b10f5e259a4be38b030543aee2fc7007f0497069defab557e0c093e8ad0148f79ae13f0a84512d9365c1fa035dc9a1c";
  const userAddress = "0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01";
  const contractAddress = "0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01";
  const surveyId =
    "0x1da44b586eb0729ff70a73c326926f6ed5a25f5b056e7f47fbc6e58d86871655";
  const answersBytes =
    "0x3020000000000000000000000000000000000000000000000000000000000000";

  it("Should construct a correct URL", async () => {
    const url = getRelayUrl("http://localhost:3000", {
      sig,
      userAddress,
      contractAddress,
      surveyId,
      answersBytes
    });

    const expectedUrl =
      "http://localhost:3000/submit/?sig=0x49bd073dd0c2400fe94eb75efdb814c38d6b10f5e259a4be38b030543aee2fc7007f0497069defab557e0c093e8ad0148f79ae13f0a84512d9365c1fa035dc9a1c&userAddress=0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01&contractAddress=0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01&surveyId=0x1da44b586eb0729ff70a73c326926f6ed5a25f5b056e7f47fbc6e58d86871655&answersBytes=0x3020000000000000000000000000000000000000000000000000000000000000";

    expect(url).toEqual(expectedUrl, "Incorrect url");
  });
});
