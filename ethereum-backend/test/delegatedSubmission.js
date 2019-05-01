const DelegatedPublicFormSubmission = artifacts.require(
  "DelegatedPublicFormSubmission"
);
const submitMethodUnitTest = require("./unitTests/submitMethodUnitTest");
const delegateSubmitMethodUnitTest = require("./unitTests/delegateSubmitMethodUnitTest");

contract("DelegatedPublicFormSubmission", accounts => {
  // Deployed instances
  let delegatedPublicFormSubmission;

  before(async () => {
    delegatedPublicFormSubmission = await DelegatedPublicFormSubmission.deployed();
  });

  it(
    `Should submit an answer with the regular "submit" method`,
    submitMethodUnitTest(() => delegatedPublicFormSubmission, accounts[0])
  );

  it(
    `Should an answer using the delegate method`,
    delegateSubmitMethodUnitTest(() => delegatedPublicFormSubmission)
  );
});
