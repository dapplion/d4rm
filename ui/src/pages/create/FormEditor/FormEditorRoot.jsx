import React, { useReducer, useMemo, useEffect } from "react";
// Redux
import { reducer, mapDispatchToActions } from "./redux";
// Components
import { OptionRow, AddOptionRow } from "./OptionRow";
import Input from "components/Input";
import Section from "components/Section";
// Icons
import Delete from "@material-ui/icons/Delete";
import Add from "@material-ui/icons/Add";

function FormEditor({ initialForm, setForm }) {
  const [form, dispatch] = useReducer(reducer, initialForm);

  const { title, description, questions } = form;

  // Wrapping in useMemo to compute it only once
  const {
    setTitle,
    setDescription,
    addQuestion,
    deleteQuestion,
    addOption,
    setText,
    setOption,
    moveOptionUp,
    moveOptionDown,
    deleteOption
  } = useMemo(() => mapDispatchToActions(dispatch), []);

  useEffect(() => {
    // Forward formatted form to the parent component
    setForm(form);
  }, [form]);

  return (
    <>
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
    </>
  );
}

export default FormEditor;
