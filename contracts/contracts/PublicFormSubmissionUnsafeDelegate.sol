pragma solidity >=0.4.22 <0.6.0;
contract PublicFormSubmissionUnsafeDelegate {

    address private _owner;
    
    /// @dev surveyId is the hash of the file in IPFS multihash
    event Submission(bytes32 indexed surveyId, address user, bytes32 answers);

    constructor() public {
        _owner = msg.sender;
    }

    /// @dev Answers are encoded as a multichoice each hex character of the bytes32 array
    /// 0x13000000... Means the second option of the first question and the fourth of the second. 
    function submit(bytes32 surveyId, bytes32 _answers) external {
        emit Submission(surveyId, msg.sender, _answers);
    }

    function submitUnsafeDelegate(bytes32 surveyId, address sender, bytes32 _answers) external {
        require(msg.sender == _owner);
        emit Submission(surveyId, sender, _answers);
    }
}
