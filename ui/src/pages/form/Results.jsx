import React from "react";
import Remove from "@material-ui/icons/Remove";

// web3.eth.getTransactionCount

function getQuestionResults(submissions) {
  const totalResponses = submissions.length;

  // Aggregate submissions counting answers per question
  const questionsResults = [];
  submissions.forEach(submission => {
    submission.answers.forEach((answer, i) => {
      if (!questionsResults[i]) questionsResults[i] = [];
      const j = answer.answerIndex;
      questionsResults[i][j] = questionsResults[i][j]
        ? questionsResults[i][j] + 1
        : 1;
    });
  });

  // Convert the answer counts to a percent
  return questionsResults.map(question =>
    question.map(count => Math.round((100 * count) / totalResponses))
  );
}

function getUniqueAddresses(submissions) {
  return Object.keys(
    submissions.reduce((users, { user }) => ({ ...users, [user]: true }), {})
  );
}

function Results({ form, submissions }) {
  const { title, questions } = form;

  if (!form || !submissions) return null;

  const uniqueAddresses = getUniqueAddresses(submissions);
  const questionsResultsPercent = getQuestionResults(submissions);
  const totalResponses = submissions.length;
  const uniqueResponses = uniqueAddresses.length;

  return (
    <>
      <div className="header">
        <div className="title">{title}</div>
      </div>

      <div className="stats">
        <div className="name">Total responses</div>
        <div className="name">Unique responses</div>
        <div className="stat">{totalResponses}</div>
        <div className="stat">{uniqueResponses}</div>
      </div>

      <details className="address-list">
        <summary>Unique addresses list</summary>
        {uniqueAddresses.map(address => (
          <div key={address}>{address}</div>
        ))}
      </details>

      <h3>Results</h3>
      {questions.map(({ text, options }, i) => {
        return (
          <div key={i} className="form-question">
            <div className="text">{text}</div>
            <div className="answers">
              {options.map((option, j) => {
                const percent =
                  ((questionsResultsPercent[i] || [])[j] || 0) + "%";
                return (
                  <React.Fragment key={j}>
                    <div className="option">
                      <Remove />
                      <span>{option}</span>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: percent }}
                      >
                        {percent}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Results;
