const randomSubmitData = require("../helpers/randomSubmitData");

/**
 * Test generator for the "submit" method
 *
 * - Ensures that there was one log "Submission"
 * - Ensures correct arguments for the log above
 */
const submitMethodUnitTest = (formSubmissionGetter, mainAccount) =>
  async function() {
    // Create submitData
    const { surveyId, answers } = randomSubmitData();

    const formSubmission = formSubmissionGetter();
    const result = await formSubmission.submit(surveyId, answers);
    const Submission = result.logs[0];
    assert.equal(Submission.event, "Submission");
    assert.equal(Submission.args.surveyId, surveyId);
    assert.equal(Submission.args.user, mainAccount);
    assert.equal(Submission.args.answers, answers);
  };

module.exports = submitMethodUnitTest;
