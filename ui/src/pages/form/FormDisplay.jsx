import React from "react";
import PropTypes from "prop-types";
// Components
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function FormDisplay({
  title,
  description,
  questions,
  answers,
  disabled,
  setAnswers
}) {
  return (
    <>
      <div className="header">
        <div className="title">{title}</div>
        <p className="description">{description}</p>
      </div>

      {questions.map(({ text, options }, i) => {
        return (
          <div key={i} className="form-question">
            <div className="text">{text}</div>
            <FormControl component="fieldset">
              <RadioGroup
                value={answers[i]}
                onChange={e => {
                  setAnswers({ ...answers, [i]: e.target.value });
                }}
              >
                {options.map((option, j) => (
                  <FormControlLabel
                    key={j}
                    value={String(j)}
                    control={<Radio color="primary" />}
                    label={option}
                    className="form-option"
                    disabled={disabled}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        );
      })}
    </>
  );
}

FormDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  answers: PropTypes.object,
  disabled: PropTypes.bool,
  setAnswers: PropTypes.func
};
FormDisplay.defaultProps = {
  answers: {},
  disabled: false,
  setAnswers: () => {}
};

export default FormDisplay;
