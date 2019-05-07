const PublicFormSubmission = artifacts.require("PublicFormSubmission");
const DelegatedPublicFormSubmission = artifacts.require(
  "DelegatedPublicFormSubmission"
);

module.exports = function(deployer) {
  deployer.deploy(PublicFormSubmission);
  deployer.deploy(DelegatedPublicFormSubmission);
};
