import React from 'react';

import Form from '../components/Form.js';
import Bname from '../components/bname.js';
import Footer from '../components/footer.js';

class BigForm extends Form {
    constructor(props) {
        super(props);
        this.onSubmitl = this.onSubmitl.bind(this);
        this.onSubmits = this.onSubmits.bind(this);
    }
    onSubmitl(data) {
		var xhr1 = new XMLHttpRequest();
        xhr1.onreadystatechange = function() {
            if (this.status === 200 && this.readyState === 4) {
                // navigate to dashboard
                console.log("logged in");
				window.location.href = "/dashboard";
				// alert("hi"+this.responseText);
				document.cookie ="username="+this.responseText+"; expires=Thu, 01 Jan 2970 00:00:00 UTC";
            } else {
                console.log("try again");
                // window.location.href = "/";
                // navigate to same page
            }
        };
		xhr1.open("POST", "http://localhost:5000/user/login");
		xhr1.setRequestHeader("Content-Type",'application/json;charset=UTF-8');
        console.log("hi"+JSON.stringify(data));
		// var d = { "username": "a1", "password": "a2" };
        xhr1.send(JSON.stringify(data));
    }
    onSubmits(data) {
		var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.status === 201 && xhr.readyState === 4) {
                // navigate to dashboard
				console.log("okay");
				alert("Successful sign up!");
				window.location.href="/";
            } else {
				console.log("try again");
				// alert("Try again!");
                // navigate to same page
            }
		};
		xhr.open("POST", "http://localhost:5000/user/add",true);
		xhr.setRequestHeader("Content-Type",'application/json;charset=UTF-8');
        console.log(JSON.stringify(data));
        // var d = { "username": "a1", "password": "a2" ,"confirm password"=};
        xhr.send(JSON.stringify(data));
    }
    render() {
        var login_fl = [{
            label: "Username",
            type: "text",
            name: "username"
        }, {
            label: "Password",
            type: "password",
            name: "password"
        }]
        var signup_fl = [{
            label: "Username",
            type: "text",
            name: "username"
        }, {
            label: "Password",
            type: "password",
            name: "password"
        }, {
            label: "Confirm Password",
            type: "password",
            name: "confirm password"
        }]
        return ( 
			<>
			
			<Bname />
            <div className="bod">
			<main>
			<div id = "home" className="section row" >
            <span className="section col s4 offset-s1 hoverable amber lighten-5">
				<h5>Login:</h5>
				< Form fieldlist = { login_fl } submitAction = { this.onSubmitl }/>   
				{/* <form className="center">
					<input type="text" name="username" placeholder="Username"></input>
					<input type="password" name="password" placeholder="Password"></input>
					<button type="submit" onClick={this.onSubmitl} className="hoverable waves-effect waves-light btn-small brown darken-4">Login</button><br></br>
				</form> */}
			</span > 
			<span className="col s2">
            <h4 ><b> OR </b></h4>  
			</span > 
			<span className="section col s4 hoverable amber lighten-5">
            	<h5>Sign up:</h5>
            	<Form fieldlist = { signup_fl } submitAction = { this.onSubmits }/>  
				{/* <form className="center">
					<input type="text" placeholder="Username" name="username"></input>
					<input type="password" placeholder="Password" name="password"></input>
					<input type="password" placeholder="Confirm password" name="confirm password"></input>
					<button type="submit" onClick="this.onSubmits" className="waves-effect waves-light btn brown darken-4">Sign up</button><br></br>
				</form> */}
			</span > 
			</div>
			</main>
            </div>
			<Footer />
			
			</>
        )
    }
}

export default BigForm;