const PublicFormSubmission = artifacts.require("PublicFormSubmission");
const DelegatedPublicFormSubmission = artifacts.require(
  "DelegatedPublicFormSubmission"
);

module.exports = function(deployer) {
  deployer.then(async () => {
    await deployer.deploy(PublicFormSubmission);
    await deployer.deploy(DelegatedPublicFormSubmission);
  });
};
