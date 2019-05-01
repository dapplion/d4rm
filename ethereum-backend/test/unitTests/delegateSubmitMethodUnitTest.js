const randomSubmitData = require("../helpers/randomSubmitData");
const generateSubmitSig = require("../helpers/generateSubmitSig");

/**
 * Test generator for the "delegatedSubmit" method
 *
 * - Ensures that there was one log "Submission"
 * - Ensures correct arguments for the log above
 * - Ensures that the `ecrecover` worked correctly comparing the user argument
 */
const delegateSubmitMethodUnitTest = formSubmissionGetter =>
  async function() {
    // Create submitData
    const { surveyId, answers } = randomSubmitData();

    // Create account and sign
    const account = web3.eth.accounts.create();
    // address: "0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01",
    // privateKey: "0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709",
    const { address, privateKey } = account;

    const { r, s, v } = generateSubmitSig({ surveyId, answers, privateKey });

    const formSubmission = formSubmissionGetter();
    const result = await formSubmission.delegatedSubmit(
      surveyId,
      answers,
      address,
      r,
      s,
      v
    );

    const Submission = result.logs[0];
    assert.equal(Submission.args.surveyId, surveyId, "Wrong survey ID");
    assert.equal(Submission.args.user, address, "Wrong user address");
    assert.equal(Submission.args.answers, answers, "Wrong answers bytes");
  };

module.exports = delegateSubmitMethodUnitTest;
