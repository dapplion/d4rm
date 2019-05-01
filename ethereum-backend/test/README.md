# Contract tests

Since the contracts of this project are heavily modular, the test code is defined in separate unit tests in the `./unitTests` folder, and then the actual test runs are constructed feeding them specific contract instances.

Notice that the `./metaDeploy.js` test performs a keyless deploy of the `DelegatedPublicFormSubmission` contract and then runs the tests on them.

Notice that the `./helpers/generateSubmitSig.js` helper contains a reference implementation on how to sign valid submissions on javascript (for the front-end).
