import React, { useReducer, useMemo, useEffect } from "react";
// Redux
import { reducer, mapDispatchToActions } from "./redux";
// Components
import Section from "components/Section";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// Icons
import fromCamelCase from "utils/fromCamelCase";
import newTabProps from "utils/newTabProps";

const submitOptions = [
  {
    name: "Generic smart contract (default)",
    description:
      "Submissions will be directed to a generic form submission smart contract already deployed, which can handle multiple surveys at once. This is the default method for non-technical users, and since the contract is already deployed, publishing the form will be free.",
    value: "smartContract",
    id: "genericSmartContract"
  }
  // {
  //   name: "New smart contract, specific to this form",
  //   description:
  //     "A new smart contract will be deployed when publishing the form. Submissions will be directed to it, and it should only serve this specific survey",
  //   note:
  //     "Only recommended for advanced users. You will have to deploy a contract and pay the transaction network's transaction fees",
  //   value: "smartContract",
  //   id: "newSmartContract"
  // }
];

const preDeployedPublicContract = {
  ropsten: "0xA56678Bc585cdB7Fdcd24176401BDf8D24927505",
  kovan: "0xA56678Bc585cdB7Fdcd24176401BDf8D24927505",
  rinkeby: "0xA56678Bc585cdB7Fdcd24176401BDf8D24927505",
  goerli: "0xA56678Bc585cdB7Fdcd24176401BDf8D24927505"
};

const availableNetworks = Object.keys(preDeployedPublicContract);

function getSubmitOptionById(_id) {
  return submitOptions.find(({ id }) => id === _id);
}

function getSubmitOptionValue(_id) {
  return (getSubmitOptionById(_id) || {}).value;
}

// rinkeby demo contract "0x77E91Ab5af418A6154637216d596d75eB8ecf70a"

function SubmitEditorRoot({ setSubmit, initialSubmit }) {
  const [submit, dispatch] = useReducer(reducer, initialSubmit);

  const { id, to, network, address } = submit;

  // Wrapping in useMemo to compute it only once
  const { setId, setTo, setNetwork, setAddress } = useMemo(
    () => mapDispatchToActions(dispatch),
    []
  );

  //   const invalidAddress = address && !isAddress(address);

  const selectedSubmission = getSubmitOptionById(id);

  useEffect(() => {
    // Forward formatted submit object to the parent component
    setSubmit(submit);
  }, [submit]);

  // Auto-select the predeployed address
  useEffect(() => {
    if (id === "genericSmartContract")
      setAddress(preDeployedPublicContract[network]);
  }, [selectedSubmission, network]);

  return (
    <>
      <Section className="submit-mechanism">
        <div className="title">Submission mechanism</div>
        <p>Specify how to aggregate user's answers.</p>

        <div>
          <FormControl fullWidth={true}>
            <InputLabel>Submit to</InputLabel>
            <Select
              value={id || ""}
              onChange={e => {
                const id = e.target.value;
                setId(id);
                setTo(getSubmitOptionValue(id));
              }}
            >
              {submitOptions.map(({ name, id }, i) => (
                <MenuItem key={i} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {selectedSubmission && (
          <>
            <p>{selectedSubmission.description}</p>
            {selectedSubmission.note && (
              <p className="alert">
                <strong>Note: </strong>
                {selectedSubmission.note}
              </p>
            )}
          </>
        )}

        {to === "smartContract" && (
          <>
            <FormControl className="select">
              <InputLabel htmlFor="age-simple">Choose network</InputLabel>
              <Select
                value={network || ""}
                onChange={e => setNetwork(e.target.value)}
              >
                {availableNetworks.map(_network => (
                  <MenuItem key={_network} value={_network}>
                    {fromCamelCase(_network)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {address && (
              <p className="at-address">
                At address{" "}
                <a
                  href={`https://${network}.etherscan.io/address/${address}`}
                  {...newTabProps}
                >
                  {address}
                </a>
              </p>
            )}
          </>
        )}
      </Section>
    </>
  );
}

export default SubmitEditorRoot;
