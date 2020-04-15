import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Predict from './pages/predict2.js';
import Home from './pages/Home.js';
import Dashboard from './pages/Dashboard.js';
import Approved from './pages/approved.js';
import NotApproved from './pages/notapproved.js';
import Query from './pages/querydb.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  };
  render() {
    return (
      <div className="App">
          <Router>
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/predict" component={Predict} />
            <Route exact path="/query" component={Query} />
            <Route exact path="/" component={Home} />
            <Route exact path="/notapproved" component={NotApproved} />
            <Route exact path="/approved" component={Approved} />
            
          </Switch>
        </Router>
      </div>

    );
  }
}

export default App;
