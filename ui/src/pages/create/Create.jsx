import React, { useState, useReducer, useMemo } from "react";
import { isAddress } from "web3-utils";
import { storeUserForm } from "services/userForms";
// Components
import { OptionRow, AddOptionRow } from "./OptionRow";
import Input from "components/Input";
import Section from "components/Section";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import LinearProgress from "@material-ui/core/LinearProgress";
// Icons
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";
import Publish from "@material-ui/icons/Publish";
import { swapItems, deleteItem } from "utils/arrays";
// Styles
import "./create.scss";

const submitOptions = ["smartContract"];
const networks = ["rinkeby", "mainnet"];

const types = {
  addQuestion: "addQuestion",
  deleteQuestion: "deleteQuestion",
  addOption: "addOption",
  setText: "setText",
  setOption: "setOption",
  moveOptionUp: "moveOptionUp",
  moveOptionDown: "moveOptionDown",
  deleteOption: "deleteOption"
};

const actions = {
  addQuestion: () => {},
  deleteQuestion: i => ({ i }),
  addOption: i => ({ i }),
  setText: (i, text) => ({ i, text }),
  setOption: (i, j, text) => ({ i, j, text }),
  moveOptionUp: (i, j) => ({ i, j }),
  moveOptionDown: (i, j) => ({ i, j }),
  deleteOption: (i, j) => ({ i, j })
};

function reducer(state, action) {
  const updateQuestion = (i, fn) =>
    Object.assign([], state, {
      [i]: { ...state[i], ...fn(state[i]) }
    });

  const updateOption = (i, j, option) =>
    updateQuestion(i, question => ({
      options: Object.assign([], question.options, { [j]: option })
    }));

  switch (action.type) {
    case types.addQuestion:
      return [...state, { text: "", options: [] }];
    case types.addOption:
      return updateQuestion(action.i, question => ({
        options: [...question.options, ""]
      }));
    case types.deleteQuestion:
      return deleteItem(state, action.i);
    case types.setText:
      return updateQuestion(action.i, () => ({ text: action.text }));
    case types.setOption:
      return updateOption(action.i, action.j, action.text);
    case types.moveOptionUp:
      return updateQuestion(action.i, question => ({
        options: swapItems(question.options, action.j, action.j - 1)
      }));
    case types.moveOptionDown:
      return updateQuestion(action.i, question => ({
        options: swapItems(question.options, action.j, action.j + 1)
      }));
    case types.deleteOption:
      return updateQuestion(action.i, question => ({
        options: deleteItem(question.options, action.j)
      }));
    default:
      throw new Error("Unknown action");
  }
}

function wrapActions(actions, types, dispatch) {
  const wrappedActions = {};
  for (const [type, action] of Object.entries(actions)) {
    if (!types[type]) throw Error(`No type defined for action key: ${type}`);
    wrappedActions[type] = (...args) =>
      dispatch({ type: types[type], ...action(...args) });
  }
  return wrappedActions;
}

// Subcomponents

function Create() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, dispatch] = useReducer(reducer, [
    { text: "Sample question", options: [] }
  ]);
  const [sumbitTo, setSubmitTo] = useState("");
  const [network, setNetwork] = useState("");
  const [address, setAddress] = useState(
    "0x77E91Ab5af418A6154637216d596d75eB8ecf70a"
  );

  // Publish variables
  const [hash, setHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const invalidAddress = address && !isAddress(address);

  // Wrapping in useMemo to compute it only once
  const {
    addQuestion,
    deleteQuestion,
    addOption,
    setText,
    setOption,
    moveOptionUp,
    moveOptionDown,
    deleteOption
  } = useMemo(() => wrapActions(actions, types, dispatch), []);

  async function publish() {
    setLoading(true);
    setError("");
    setHash("");
    try {
      const formObj = {
        title,
        description,
        questions,
        submit: {
          to: network,
          address
        }
      };
      console.log("Uploading form object", formObj);
      const hash = await window.add(formObj);
      setHash(hash);
      storeUserForm(hash, formObj);
    } catch (e) {
      console.error(`Error uploading formObj: ${e.stack}`);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  const validForm =
    title &&
    questions.length &&
    questions.reduce(
      (valid, question) => valid && question.text && question.options.length,
      true
    ) &&
    sumbitTo &&
    network &&
    address &&
    !invalidAddress
      ? true
      : false;

  return (
    <div id="create" className="site-width main-section">
      <Section>
        <div className="header">
          <Input
            label="Form title"
            value={title}
            onValueChange={setTitle}
            InputProps={{ style: { fontSize: "2.5rem" } }}
          />
          <Input
            label="Form description"
            value={description}
            onValueChange={setDescription}
            multiline={true}
          />
        </div>
      </Section>

      {questions.map(({ text, options }, i) => (
        <Section key={i} className="question">
          <div className="header">
            <Input
              label={`${i + 1}. Question text`}
              value={text}
              onValueChange={value => setText(i, value)}
              onEnterPress={() => addOption(i)}
              margin="none"
            />
            <Delete onClick={() => deleteQuestion(i)} />
          </div>

          <div className="options">
            {options.map((option, j) => (
              <OptionRow
                key={j}
                value={option}
                onValueChange={value => setOption(i, j, value)}
                onUp={() => moveOptionUp(i, j)}
                onDown={() => moveOptionDown(i, j)}
                onDelete={() => deleteOption(i, j)}
                onEnterPress={() =>
                  j === options.length - 1 ? addOption(i) : null
                }
              />
            ))}
            <AddOptionRow onAdd={() => addOption(i)} />
          </div>
        </Section>
      ))}

      <Section className="add-question" onClick={addQuestion}>
        <Add className="button-svg" />
        Add question
        <div id="gradient" />
      </Section>

      <Section className="submit-mechanism">
        <div className="title">Submission mechanism</div>
        <p>Specify how to aggregate user's answers.</p>
        <FormControl className="select">
          <InputLabel htmlFor="age-simple">Submit to</InputLabel>
          <Select value={sumbitTo} onChange={e => setSubmitTo(e.target.value)}>
            {submitOptions.map(option => (
              <MenuItem key={option} value={option}>
                {fromCamelCase(option)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {sumbitTo === "smartContract" && (
          <FormControl className="select">
            <InputLabel htmlFor="age-simple">Publish to</InputLabel>
            <Select value={network} onChange={e => setNetwork(e.target.value)}>
              {networks.map(option => (
                <MenuItem key={option} value={option}>
                  {fromCamelCase(option)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {sumbitTo === "smartContract" && (
          <Input
            label={
              invalidAddress
                ? "Invalid address"
                : `Smart contract ${network} address`
            }
            error={invalidAddress}
            value={address}
            onValueChange={setAddress}
          />
        )}
      </Section>

      {!hash && !loading && (
        <div className="publish-button">
          <Button
            variant="contained"
            color="primary"
            onClick={publish}
            disabled={!validForm}
          >
            <Publish className="button-svg" />
            Publish
          </Button>
        </div>
      )}

      {loading && (
        <div>
          Publishing...
          <LinearProgress />
        </div>
      )}

      {error && <div style={{ color: "red" }}>Error publishing: {error}</div>}

      {hash && (
        <div>
          <h6>Published form!</h6>
          <p>{hash}</p>
        </div>
      )}

      <div className="mt-5" />
    </div>
  );
}

function fromCamelCase(s = "") {
  return s.replace(/^[a-z]|[A-Z]/g, function(v, i) {
    return i === 0 ? v.toUpperCase() : " " + v.toLowerCase();
  });
}

export default Create;
