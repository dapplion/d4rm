const PublicFormSubmission = artifacts.require("PublicFormSubmission");
const submitMethodUnitTest = require("./unitTests/submitMethodUnitTest");

contract("PublicFormSubmission", accounts => {
  // Deployed instances
  let publicFormSubmission;

  before(async () => {
    publicFormSubmission = await PublicFormSubmission.deployed();
  });

  it(
    `Should submit an answer with the regular "submit" method`,
    submitMethodUnitTest(() => publicFormSubmission, accounts[0])
  );
});
