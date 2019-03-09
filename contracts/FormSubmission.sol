pragma solidity >=0.4.22 <0.6.0;
contract FormSubmission {
    
    event Submission(bytes answer);

    constructor() public {}

    function submit(bytes memory _answer) public {
        emit Submission(_answer);
    }
}