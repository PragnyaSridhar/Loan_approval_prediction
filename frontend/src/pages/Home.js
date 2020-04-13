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
            } else {
                console.log("try again");
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
            type: "text",
            name: "password"
        }]
        var signup_fl = [{
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
			<>
			<Bname />
			<div id = "home" >
            <span>
				Login:
				< Form fieldlist = { login_fl } submitAction = { this.onSubmitl }/>   
			</span > 
			<span >
            <h3 > OR </h3>  
			</span > 
			<span >
            	Sign Up:
            	<Form fieldlist = { signup_fl } submitAction = { this.onSubmits }/>  
			</span > 
			</div>
			<Footer />
			</>
        )
    }
}

export default BigForm;