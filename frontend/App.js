import React from 'react';
import './App.css';

import Form from './Form.js'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {logged_in:false};
    this.changeState = this.changeState.bind(this);
    };
  changeState() {
    console.log("logging you in...");
    this.setState({
      logged_in: true
    });
  }
  render() {
    var fl;
    if (this.state.logged_in === false) {
      fl = [
        {label:"User-id",type:"text",name:"User-id"},{label:"Password",type:"text",name:"Password"}
      ]
    }
    else {
      fl = [{
        label: "gender",
        type: "select",
        options:["Male","Female"],
        name: "gender"
      }, {
        label: "customer-name",
        type: "text",
        name: "customer-name"
      }]
    }
    return (
    <div className="App">
      <header>
        <p>Hello!</p>
      </header>
      < Form action = "." fieldlist = { fl } myprop={ ()=>{this.changeState();}} />
    </div>
  )
  }
}

export default App;
