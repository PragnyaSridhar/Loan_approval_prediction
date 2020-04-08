import React from 'react';
import './App.css';

import Login from './Login.js'
import BigForm from './BigForm.js'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      bigFormSubmitted: false
    };
    this.login = this.login.bind(this);
    this.bigFormSubmit = this.bigFormSubmit.bind(this);
  };
  login() {
    this.setState({logged_in: true});
  }
  bigFormSubmit() {
    this.setState({bigFormSubmitted: true});
  }
  render() {
    if (this.state.logged_in === false) {
      return (
        <div className="App">
          <header>
            <p>Header</p>
          </header>
          <Login changeState={this.login} />
        </div>
      )
    } else if (this.state.bigFormSubmitted === false) {
      return (
        <div className="App">
          <header>
            <p>Header</p>
          </header>
          <BigForm changeState={this.bigFormSubmit} />
        </div>
      )
    } else {
      return (
        <p>BLABLABLA</p>
      )
    }
  }
}

export default App;
