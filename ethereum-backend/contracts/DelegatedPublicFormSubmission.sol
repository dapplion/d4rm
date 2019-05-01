pragma solidity >=0.4.22 <0.6.0;

import "./PublicFormSubmission.sol";

contract DelegatedPublicFormSubmission is PublicFormSubmission {
    /// @dev Allow users with no ETH to participate in the survey
    /// The user parameter is not necessary but ensures correct submissions
    /// The Metamask signing scheme is changing quick and there's risk of
    /// submissions producing wrong signer addresses
    /// @dev The surveyId is the content hash of the survey IPFS has
    /// which contains this contract's address and the network ID. Therefore
    /// the surveyId prevents reusing this signature in other networks or contracts
    /// @dev The front-end will filter by equal submissions, so with on a replay 
    /// attack, additional submissions will be ignored
    function delegatedSubmit(
        bytes32 surveyId,
        bytes32 answers,
        address user,
        bytes32 r, 
        bytes32 s, 
        uint8 v
    ) public {
        /// @dev Pre-hashed value to save hash
        /// [ "bytes32 Survey ID", "bytes32 Answers" ]
        /// 0xb6a5021c7e19977fdd997afd3c98f64fd1c39faa37ce5d847d7ae2483519c5f4
        bytes32 schemaHash = 0xb6a5021c7e19977fdd997afd3c98f64fd1c39faa37ce5d847d7ae2483519c5f4;

        bytes32 _hash = keccak256(abi.encode(
            schemaHash,
	        keccak256(abi.encode(surveyId, answers))
        ));

		address signer = ecrecover(_hash, v, r, s);
        require(signer == user);
        emit Submission(surveyId, signer, answers);
	}
}
