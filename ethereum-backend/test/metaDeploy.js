const DelegatedPublicFormSubmission = artifacts.require(
  "DelegatedPublicFormSubmission"
);
const submitMethodUnitTest = require("./unitTests/submitMethodUnitTest");
const delegateSubmitMethodUnitTest = require("./unitTests/delegateSubmitMethodUnitTest");
const deploy = require("../deploy");

contract("DelegatedPublicFormSubmission", accounts => {
  // Deployed instances
  let delegatedPublicFormSubmission;
  let contractAddress;

  it(`Should deploy the DelegatedPublicFormSubmission contract using a keyless deploy`, async () => {
    // deploy must be a callback style function to work with `truffle exec`
    contractAddress = await new Promise((resolve, reject) =>
      deploy((err, res) => {
        if (err) reject(err);
        else resolve(res);
      })
    );

    assert.equal(
      web3.utils.isAddress(contractAddress),
      true,
      `Deployed contract address: "${contractAddress}" is not an address`
    );
    delegatedPublicFormSubmission = await DelegatedPublicFormSubmission.at(
      contractAddress
    );
  });

  it(
    `Should submit an answer with the regular "submit" method (on keyless deploy)`,
    submitMethodUnitTest(() => delegatedPublicFormSubmission, accounts[0])
  );

  it(
    `Should an answer using the delegate method (on keyless deploy)`,
    delegateSubmitMethodUnitTest(() => delegatedPublicFormSubmission)
  );
});
