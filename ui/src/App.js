import React, { Component } from 'react';
import './App.css';
import ipfs from './ipfs';
import Web3 from 'web3';
import sumbitContractAbi from './SumbitContractAbi.json'

const web3 = new Web3('https://rinkeby.infura.io');
window.web3 = web3;
// web3.eth.getTransactionCount

class App extends Component {
  constructor() {
    super();
    this.state = { title: null, questions: null };
  }

  async componentDidMount() {
    let hash = window.location.hash
    if (hash.startsWith('#/')) hash = hash.slice(2)
    else if (hash.startsWith('#')) hash = hash.slice(1)

    // Parse hash
    if (ipfs.isHash(hash)) {
      const obj = await ipfs.cat(hash)
      console.log({hash, obj})
      if (obj.title && obj.questions && Array.isArray(obj.questions) && obj.submit) {
        this.setState({title: obj.title, questions: obj.questions, submit: obj.submit, validForm: true})

        console.log({obj})
        // Parse existing answers
        const submitContract = new web3.eth.Contract(sumbitContractAbi, this.state.submit.address);
        const events = await submitContract.getPastEvents('Submission', {fromBlock: '0'})
        const previousSubmissions = events.map(event => {
          const answer = (event.returnValues.answer || "").replace('0x', '')
          const parsedAnswers = []
          for (let i=0; i<obj.questions.length; i++) {
            const stringPos = i*2 // 2 hex characters per byte
            const answerIndex = parseInt(answer.slice(stringPos, stringPos+2), 16)
            parsedAnswers.push({
              title: obj.questions[i].title,
              answer: obj.questions[i].answers[answerIndex]
            })
          }
          return { answers: parsedAnswers, txHash: event.transactionHash }
        })
        this.setState({previousSubmissions})
      } else {
        this.setState({error: 'Form obj is not correct'})
      }
    }

    
  }

  async submit() {
    const answerIds = this.state.questions.map((_, i) => {
      const answerIndex = document.getElementById('question-'+i).value
      if (isNaN(answerIndex)) throw Error('Answer index must be a number')
      if (answerIndex > 255) throw Error('Max number of possible answers for questions is 255')
      return parseInt(answerIndex).toString(16).padStart(2, '0')
    })
    const answerBytes = '0x' + answerIds.join('')
    console.log({answerBytes, submit: this.state.submit})
    if (this.state.submit.to === 'rinkeby') {
      if (window.ethereum) {
        await window.ethereum.enable();
        const web3 = new Web3('https://rinkeby.infura.io');
        const submitContract = new web3.eth.Contract(sumbitContractAbi, this.state.submit.address);
        if (!web3.utils.isAddress(window.ethereum.selectedAddress)) {
          throw Error(`Could not get address from window.ethereum.selectedAddress ${window.ethereum.selectedAddress}`)
        }
        const data = submitContract.methods.submit(answerBytes).encodeABI();
        const transactionParameters = {
          to: this.state.submit.address,
          from: window.ethereum.selectedAddress,
          data,
        }
        window.ethereum.sendAsync({
          method: 'eth_sendTransaction',
          params: [transactionParameters],
          from: window.ethereum.selectedAddress,
        }, function (err, result) {
          console.log({err, result})
          // A typical node-style, error-first callback.
          // The result varies by method, per the JSON RPC API.
          // For example, this method will return a transaction hash on success.
        })
      } else {
        this.setState({error: 'You must have a recent version of metamask installed'})
      }
    } else {
      this.setState({error: 'Unsupported submit method'})
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.validForm ? 
            <div>
              <h3>{this.state.title}</h3>
              {this.state.questions.map((question, i) => (
                <div key={i}>
                  <h5>{`${i} - ${question.title}`}</h5>
                  {question.answers && Array.isArray(question.answers) ?
                    <select id={'question-'+i}>
                      {question.answers.map((answer, j) => (
                        <option key={j} value={j}>{`${j} - ${answer}`}</option>
                      ))}
                    </select>
                    : <p>Error, no valid answers</p>
                  }
                </div>
              ))}
              <button onClick={this.submit.bind(this)}>Submit</button>
              <p style={{opacity: 0.3, fontSize: '50%'}}>Submit to {this.state.submit.to} {this.state.submit.address}</p>
            </div>
            : null
          }
          {this.state.error ? <p>Error: {this.state.error}</p> : null}
          {this.state.previousSubmissions ? 
          <div>
            <h3>Submissions</h3>
            {this.state.previousSubmissions.map((submission, i) => 
            <div key={i}>
              <h5>TxHash: {submission.txHash.slice(0, 18)}</h5>
              <ul>
                {submission.answers.map((question, j) => <li key={j}>{question.title}: {question.answer}</li>)}
              </ul>
            </div>)}
          </div> : null }
        </header>
      </div>
    );
  }
}

export default App;
