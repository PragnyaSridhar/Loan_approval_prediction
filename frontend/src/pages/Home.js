import React from 'react';

import Form from '../components/Form.js'

class BigForm extends Form {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onSubmit(data) {

	}
	render() {
		var login_fl = [{
			label: "Username",
			type: "text",
			name: "username"
		}, {
			label: "Password",
			type: "text",
			name: "password"
		}]
		var signin_fl = [{
			label: "Username",
			type: "text",
			name: "username"
		}, {
			label: "Password",
			type: "text",
			name: "password"
		}, {
			label: "Confirm Password",
			type: "text",
			name: "confirm password"
		}]
		return (
			<div id="home">
				<span>
				Login:
				< Form fieldlist = { login_fl } submitAction = { this.onSubmit } />
				</span>
				<span>
				<h3>OR</h3>
				</span>
				<span>
				Signin:
				< Form fieldlist = { signin_fl } submitAction = { this.onSubmit } />
				</span>
			</div>
		)
		}
	}

	export default BigForm;