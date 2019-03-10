import React, { Component } from "react";
import ipfs from "./ipfs";
import Web3 from "web3";
import sumbitContractAbi from "./SumbitContractAbi.json";
import parseHash from "./parseHash";
import Loading from "./Loading";
import { areAnswersFulfilled, endWithQuestionMark } from "./utils";

const web3 = new Web3("https://rinkeby.infura.io");
window.web3 = web3;
// web3.eth.getTransactionCount

export default class Form extends Component {
  constructor() {
    super();
    this.state = { title: null, questions: null, answers: {} };
  }

  async componentDidMount() {
    try {
      const hash = parseHash();

      // Parse hash
      if (ipfs.isHash(hash)) {
        this.setState({ loading: true });
        const obj = await ipfs.cat(hash);
        console.log({ hash, obj });
        if (
          obj.title &&
          obj.questions &&
          Array.isArray(obj.questions) &&
          obj.submit
        ) {
          this.setState({
            title: obj.title,
            questions: obj.questions,
            submit: obj.submit,
            validForm: true
          });
          this.setState({ loading: false });
        } else {
          this.setState({ error: "Form obj is not correct" });
          this.setState({ loading: false });
        }
      } else {
        this.setState({ error: "No valid IPFS hash provided" });
      }
    } catch (e) {
      this.setState({ error: `Error: ${e.stack}`, loading: false });
    }
  }

  async submit(e) {
    try {
      e.preventDefault();
      const answerIds = Object.values(this.state.answers).map(answerIndex => {
        if (isNaN(answerIndex)) throw Error("Answer index must be a number");
        if (answerIndex > 255)
          throw Error("Max number of possible answers for questions is 255");
        return parseInt(answerIndex)
          .toString(16)
          .padStart(2, "0");
      });
      const answerBytes = "0x" + answerIds.join("");
      console.log({ answerBytes, submit: this.state.submit });
      if ((this.state.submit || {}).to === "rinkeby") {
        if (window.ethereum) {
          await window.ethereum.enable();
          const web3 = new Web3("https://rinkeby.infura.io");
          // Check addresses
          if (!web3.utils.isAddress(window.ethereum.selectedAddress)) {
            throw Error(
              `Could not get address from window.ethereum.selectedAddress ${
                window.ethereum.selectedAddress
              }`
            );
          }
          if (!web3.utils.isAddress(this.state.submit.address)) {
            throw Error(
              `Submit address is not valid: ${this.state.submit.address}`
            );
          }

          const submitContract = new web3.eth.Contract(
            sumbitContractAbi,
            this.state.submit.address
          );
          const data = submitContract.methods.submit(answerBytes).encodeABI();
          const transactionParameters = {
            to: this.state.submit.address,
            from: window.ethereum.selectedAddress,
            data
          };
          this.setState({ submitting: true });
          async function sendAsync() {
            return new Promise((resolve, reject) => {
              window.ethereum.sendAsync(
                {
                  method: "eth_sendTransaction",
                  params: [transactionParameters],
                  from: window.ethereum.selectedAddress
                },
                function(err, result) {
                  if (err) reject(err);
                  else resolve(result);
                }
              );
            });
          }
          const result = await sendAsync();
          this.setState({
            submissionHash: (result || {}).result,
            submitting: false
          });
        } else {
          this.setState({
            error: "You must have a recent version of metamask installed"
          });
        }
      } else {
        this.setState({ error: "Unsupported submit method" });
      }
    } catch (e) {
      this.setState({
        error: `Error: ${e.stack}`,
        submitting: false,
        loading: false
      });
    }
  }

  render() {
    const answersFulfilled = areAnswersFulfilled(
      this.state.answers,
      this.state.questions
    );
    console.log({
      answers: this.state.answers,
      questions: this.state.questions
    });

    if (this.state.loading) return <Loading />;

    const txHashUrl =
      (this.state.submit || {}).to === "rinkeby"
        ? `https://rinkeby.etherscan.io/tx/${this.state.submissionHash}`
        : null;

    return (
      <div>
        {this.state.validForm ? (
          <div>
            <h3>{this.state.title}</h3>
            <form>
              {this.state.questions.map((question, i) => {
                const maxAnswerLength = Math.max(
                  ...question.answers.map(s => s.length)
                );
                const width = 50 + maxAnswerLength * 10 + "px";
                return (
                  <div key={i} className="mt-3">
                    <div className="row">
                      <div className="col-1">
                        <h5>{i + 1}</h5>
                      </div>
                      <div className="col-11">
                        <h5>{endWithQuestionMark(question.title)}</h5>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-1" />
                      <div className="col-11">
                        {question.answers && Array.isArray(question.answers) ? (
                          question.answers.map((answer, j) => {
                            const selected = this.state.answers[i] === j;
                            const selectedStyle = selected
                              ? { backgroundColor: "#6c757d", color: "white" }
                              : {};
                            return (
                              <div key={j}>
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary mt-1 text-left"
                                  onClick={() =>
                                    this.setState({
                                      answers: { ...this.state.answers, [i]: j }
                                    })
                                  }
                                  style={{
                                    ...selectedStyle,
                                    width,
                                    overflowWrap: "break-word"
                                  }}
                                >
                                  {answer}
                                </button>
                              </div>
                            );
                          })
                        ) : (
                          <p>Error, no valid answers</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="row mt-3">
                <div className="col-1" />
                <div className="col-11">
                  {this.state.submitting ? (
                    <h6>Submitting...</h6>
                  ) : this.state.submissionHash ? (
                    <div>
                      <h6>
                        {txHashUrl ? (
                          <a href={txHashUrl}>Submitted!</a>
                        ) : (
                          "Submitted!"
                        )}{" "}
                        Thank you for participating
                      </h6>
                    </div>
                  ) : (
                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={this.submit.bind(this)}
                        disabled={!answersFulfilled}
                      >
                        Submit
                      </button>
                      <p style={{ opacity: 0.5, fontSize: "75%" }}>
                        Submits to {this.state.submit.to}{" "}
                        {this.state.submit.address}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        ) : null}
        {this.state.error ? <h5>Error: {this.state.error}</h5> : null}
      </div>
    );
  }
}

// Utilities
