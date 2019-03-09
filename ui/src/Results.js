import React, { Component } from 'react';
import ipfs from './ipfs';
import Web3 from 'web3';
import sumbitContractAbi from './SumbitContractAbi.json'
import './fromTemplate.css'
import parseHash from './parseHash' 
import Loading from './Loading'

const web3 = new Web3('https://rinkeby.infura.io');
window.web3 = web3;
// web3.eth.getTransactionCount

export default class Results extends Component {
  constructor() {
    super();
    this.state = { submissions: [] };
  }

  async componentDidMount() {
    try {
      const hash = parseHash()

      // Parse hash
      if (ipfs.isHash(hash)) {
          this.setState({loading: true})
        const obj = await ipfs.cat(hash)
        console.log({hash, obj})
        if (obj.title && obj.questions && Array.isArray(obj.questions) && obj.submit) {
          this.setState({title: obj.title, questions: obj.questions, submit: obj.submit, validForm: true})

          // Parse existing answers
          const submitContract = new web3.eth.Contract(sumbitContractAbi, this.state.submit.address);
          const events = await submitContract.getPastEvents('Submission', {fromBlock: '0'})

          const submissions = events.map(event => {
            const answers = (event.returnValues.answers || "").replace('0x', '')
            const parsedAnswers = []
            for (let i=0; i<obj.questions.length; i++) {
              const stringPos = i*2 // 2 hex characters per byte
              const answerIndex = parseInt(answers.slice(stringPos, stringPos+2), 16)
              parsedAnswers.push({
                title: obj.questions[i].title,
                answer: obj.questions[i].answers[answerIndex],
                answerIndex
              })
            }
            return { answers: parsedAnswers, txHash: event.transactionHash, user: event.returnValues.user }
          })
          console.log({submissions})

          // Do math and aggregate the submissions
          const totalResponses = submissions.length
          const uniqueResponses = getUnique(submissions, 'user').length
          const questionsResults = {}
          submissions.forEach((submission) => {
            submission.answers.forEach((answer, i) => {
              if (!questionsResults[i]) questionsResults[i] = {}
              const j = answer.answerIndex
              questionsResults[i][j] = questionsResults[i][j] ? questionsResults[i][j] + 1 : 1
            })
          })
          console.log(questionsResults)

          this.setState({submissions, totalResponses, uniqueResponses, questionsResults})
          this.setState({loading: false})
        } else {
          this.setState({error: 'Form obj is not correct'})
          this.setState({loading: false})
        }
      } else {
          this.setState({error: 'No valid IPFS hash provided'})
      }
    } catch(e) {
      this.setState({error: `Error: ${e.stack}`})
    }
  }

  render() {
    if (this.state.loading) return <Loading/>
    if (!this.state.loading && !this.state.submissions.length) return <h5>No submissions yet</h5>
    return (
        <div>
          {this.state.error ? <h5>Error: {this.state.error}</h5> : null}

          <h5>{this.state.title}</h5>
          <table className="table" style={{maxWidth: '300px', borderWidth: '0px', padding: '0px'}}>
            <tbody>
              <tr style={{fontSize: '80%', opacity: '0.7'}}>
                <td>Total responses</td>
                <td>Unique responses</td>
              </tr>
              <tr style={{fontSize: '300%'}}>
                <td>{this.state.totalResponses}</td>
                <td>{this.state.uniqueResponses}</td>
              </tr>
            </tbody>
          </table>

          <h3>Results</h3>
          {(this.state.questions || []).map((question, i) => {
            return (
              <div key={i}  style={{marginTop: '20px'}}>
                
                <div className="row">
                  <div className="col-1">
                    <h5>{i}</h5>
                  </div>
                  <div className="col-11">
                    <h5>{question.title}</h5>
                  </div>
                </div>

                {question.answers.map((answer, j) => {
                  const results = (this.state.questionsResults || {})[i] || {}
                  const total = Object.values(results).reduce((a, c) => a + c, 0)
                  const count = results[j] || 0
                  const percent = total ? Math.floor(100*count/total) + '%' : null
                  return <div key={j}>
                    <div className="row">
                      <div className="col-1"></div>
                      <div className="col-5">{answer}</div>
                      <div className="col-6">
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" style={{width: percent}}>{percent}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                })}
            </div>
            )
          })}

          
        </div>
    );
  }
}

// Utils

function getUnique(arr, comp) {

  const unique = arr
       .map(e => e[comp])

     // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)

    // eliminate the dead keys & store unique objects
    .filter(e => arr[e]).map(e => arr[e]);

   return unique;
}
