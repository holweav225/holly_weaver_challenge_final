import React from "react";
import logo from "./logo.svg";
import Brewerylist from "../brewerylist";
import Brewerydetails from "../brewerydetails";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

const history = createHistory();

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Brewerylist} />
          <Route exact path="/brewerydetails" component={Brewerydetails} />
          <Route exact path="/brewerylist" component={Brewerylist} />
        </Switch>
      </Router>
    );
  }
}

export default App;
