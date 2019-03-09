import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import Web3 from 'web3';
import Nav from "./Nav"
import Create from "./Create"
import Share from "./Share"
import Results from "./Results"
import Form from './Form'
import './fromTemplate.css'
import './customizeBootstrap.css'

const web3 = new Web3('https://rinkeby.infura.io');
window.web3 = web3;
// web3.eth.getTransactionCount

class App extends Component {
  constructor() {
    super();
    this.state = { title: null, questions: null };
  }

  render() {
    return (
      <Router>
      <div className="App">
        <Nav/>
        <div className="container" style={{marginTop: '140px'}}>
          <Route path="/" exact render={() => (<h1>Hello</h1>)} />
          {/* <Route path="/create" component={Create} />
          <Route path="/share" component={Share} /> */}
          <Route path="/results" component={Results} />
          <Route path="/form" component={Form} />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
