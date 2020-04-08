import React from 'react';

import Form from './Form.js'

class Login extends Form {
	constructor(props) {
		super(props);
	}
	render() {
		var fl = [
		{label:"User-id",type:"text",name:"User-id"},{label:"Password",type:"text",name:"Password"}
		]
		return(< Form fieldlist = { fl } submitAction={this.onSubmit} changeState={this.props.changeState} />)
	}
}

export default Login;
