import React, { useState } from "react";
import submitAnswers from "services/submitAnswers";
// Components
import FormDisplay from "./FormDisplay";
import Button from "@material-ui/core/Button";
// Utils
import { areAnswersFulfilled } from "utils/utils";

function Answer({ form, hash }) {
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
        submit,
        hash
      });
      setTxHash(submissionHash);
    } catch (e) {
      setError(e.message);
      console.error(`Èrror onSubmit answers: ${e.message}`);
    } finally {
      setSubmitting(false);
    }
  }

  const answersFulfilled = areAnswersFulfilled(answers, questions);

  if (txHash)
    return (
      <div>
        <h5>Success!</h5>
        <p>
          Answers submitted to{" "}
          <a href={`https://${submit.network}.etherscan.io/tx/${txHash}`}>
            {submit.network}
          </a>
        </p>
      </div>
    );

  return (
    <>
      <FormDisplay
        {...{ title, description, questions, answers, setAnswers }}
      />

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
              Submits to {submit.to} at {submit.network} {submit.address}
            </p>
            {error && <h5>Error: {error}</h5>}
          </div>
        )}
      </div>
    </>
  );
}

export default Answer;
