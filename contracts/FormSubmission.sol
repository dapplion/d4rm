pragma solidity >=0.4.22 <0.6.0;
contract FormSubmission {
    
    event Submission(address user, bytes answers);

    constructor() public {}

    function submit(bytes memory _answers) public {
        emit Submission(msg.sender, _answers);
    }
}
