import signAnswers from "../../../services/submitAnswers/signAnswers";
import recoverFromSignedAnswers from "../../../services/submitAnswers/recoverFromSignedAnswers";

describe("services > submitAnswers, validate signatures", () => {
  const address = "0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01";
  const privateKey =
    "0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709";
  const surveyId =
    "0x1da44b586eb0729ff70a73c326926f6ed5a25f5b056e7f47fbc6e58d86871655";
  const answersBytes =
    "0x3020000000000000000000000000000000000000000000000000000000000000";

  it("Should sign and recover the address", async () => {
    const sig = await signAnswers({ privateKey, surveyId, answersBytes });

    expect(typeof sig).toEqual("string", "Signature must be a string");
    const recoveredAddress = recoverFromSignedAnswers({
      sig,
      surveyId,
      answersBytes
    });

    expect(recoveredAddress).toEqual(
      address,
      "Address should equal the recovered address"
    );
  });
});
