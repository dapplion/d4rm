import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route, Switch } from "react-router-dom";
import Web3 from "web3";
import Nav from "components/Nav";
// Pages
import Home from "./pages/home/Home";
import Create from "./pages/create/Create";
import Form from "./pages/form/Form";

const web3 = new Web3("https://rinkeby.infura.io");
window.web3 = web3;
// web3.eth.getTransactionCount

console.log("Version: 1552176415442");

class App extends Component {
  constructor() {
    super();
    this.state = { title: null, questions: null };
  }

  render() {
    return (
      <>
        <CssBaseline />
        <Nav />
        <Switch>
          <Route path={"/"} exact={true} component={Home} />
          <Route path={"/create"} component={Create} />
          <Route path={"/:hash/:showResults?"} component={Form} />
          <Route render={() => <h1>404 Route not found</h1>} />
        </Switch>
      </>
    );
  }
}

export default App;
