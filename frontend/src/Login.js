import React, { useEffect } from 'react';

import Form from './Form.js'

class Login extends Form {
	constructor(props) {
		super(props);
	}
	
	render() {
		function onSubmit(data) {
			console.log(data);
			// useEffect(() => {
			// 	fetch();
			// })
			// var xhr = new XMLHttpRequest();
			// xhr.open("POST", "http://localhost:5000/user/login", false);
			// xhr.onreadystatechange = () => {
			// 	console.log("hii");
			// 	if (this.readyState == 4 && this.status == 200) {
			// 		this.props.changeState();
			// 	} else {
			// 		console.log(this.readyState);
			// 		console.log(this.status);
			// 	}
			// }
			// xhr.send(JSON.stringify(data));
		}
		var fl = [
		{label:"Username",type:"text",name:"username"},{label:"Password",type:"text",name:"password"}
		]
		return(< Form fieldlist = { fl } submitAction={onSubmit} />)
	}
}

export default Login;
