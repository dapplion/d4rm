import React, { useState, useEffect } from "react";
import submitAnswers from "services/submitAnswers";
// Components
import FormDisplay from "./FormDisplay";
import Button from "@material-ui/core/Button";
// Utils
import { areAnswersFulfilled } from "utils/utils";
import { getContractUrl, getTxUrl } from "utils/getBlockExplorerUrl";

const faucetUrl = {
  ropsten: "https://faucet.ropsten.be/",
  kovan: "https://faucet.kovan.network/",
  rinkeby: "https://faucet.rinkeby.io/",
  goerli: "https://goerli-faucet.slock.it/"
};

function Answer({ form, hash }) {
  const { title, description, questions, submit } = form;

  // #### TODO
  // const [metamaskStatus, setMetamaskStatus] = useState("");

  // useEffect(() => {
  //   if (window.ethereum) {}
  // }, []);

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
          <a href={getTxUrl(submit.network, txHash)}>{submit.network}</a>
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
              Submits to {submit.to} at {submit.network}{" "}
              <a href={getContractUrl(submit.network, submit.address)}>
                {submit.address}
              </a>
            </p>
            <p style={{ opacity: 0.5, fontSize: "75%" }}>
              Need funds? Go to the{" "}
              <a href={faucetUrl[submit.network]}>{submit.network} faucet</a>.
              You need ~ 0.000025475 Ether to submit.
            </p>

            {error && <p style={{ color: "red" }}>Error: {error}</p>}
          </div>
        )}
      </div>
    </>
  );
}

export default Answer;
