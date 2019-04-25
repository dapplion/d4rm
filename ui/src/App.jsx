import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route, Switch } from "react-router-dom";
import Nav from "components/Nav";
// Pages
import Home from "./pages/home/Home";
import Create from "./pages/create";
import Form from "./pages/form/Form";

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
          <Route path={"/create/:publish?"} component={Create} />
          <Route path={"/:hash/:showResults?"} component={Form} />
          <Route render={() => <h1>404 Route not found</h1>} />
        </Switch>
      </>
    );
  }
}

export default App;
