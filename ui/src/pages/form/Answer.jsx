import React, { useState } from "react";
import submitAnswers from "services/submitAnswers";
// Components
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// Utils
import { areAnswersFulfilled } from "utils/utils";

function Answer({ form }) {
  const { title, description, questions, submit } = form;

  const [answers, setAnswers] = useState({});
  const [txHash, setTxHash] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit() {
    try {
      setSubmitting(true);
      const submissionHash = await submitAnswers({
        answers,
        submit
      });
      setTxHash(submissionHash);
    } catch (e) {
      setError(e.message);
      console.error(`Èrror fetchingsubmitting answers: ${e.message}`);
    } finally {
      setSubmitting(false);
    }
  }

  const answersFulfilled = areAnswersFulfilled(answers, questions);

  if (txHash)
    return (
      <div>
        <h5>Success!!</h5>
        <p>
          Answers submitted to{" "}
          <a href={`https://rinkeby.etherscan.io/tx/${txHash}`}>rinkeby</a>
        </p>
      </div>
    );

  return (
    <>
      <div className="header">
        <div className="title">{title}</div>
        <p className="description">ansdljnasljdnlasd{description}</p>
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
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        );
      })}

      <div className="submit">
        {submitting ? (
          <h6>Submitting...</h6>
        ) : (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              disabled={!answersFulfilled}
            >
              Submit
            </Button>

            <p style={{ opacity: 0.5, fontSize: "75%" }}>
              Submits to {submit.to} {submit.address}
            </p>
            {error && <h5>Error: {error}</h5>}
          </div>
        )}
      </div>
    </>
  );
}

export default Answer;
