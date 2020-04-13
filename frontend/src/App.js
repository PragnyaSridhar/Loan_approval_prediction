import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './pages/Login.js';
import Predict from './pages/predict2.js';
import Home from './pages/Home.js';
import Dashboard from './pages/Dashboard.js';
import Approved from './pages/approved.js';
import NotApproved from './pages/notapproved.js';

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
            <Route exact path="/login" component={Login} />
              {/*<Route exact path = "/bigform" render={()=>{check for the cookie here maybe ¯\_(ツ)_/¯ } (<Redirect to={{pathname: "/bigform"}} />) >*/}
              {/*Not Sure About The Syntax Of This Line ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^*/}
            { 
              (()=> { /*check cookie here*/ return true}) &&
              < Route exact path = "/bigform" component={Predict} />
            }
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/predict" component={Predict} />
            <Route exact path="/query" component={Home} />
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
