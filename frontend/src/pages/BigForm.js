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
		var fl = [{
				label: "Gender",
				type: "select",
				options: ["Male", "Female"], /*NOTE First value in the options list will be the the default.*/
				name: "gender"
			},
			{
				label: "Married",
				type: "select",
				options: ["Yes", "No"],
				name: "married"
			},
			{
				label: "Dependents",
				type: "select",
				options: ["0", "1", "2", "3+"],
				name: "dependents"
			},
			{
				label: "Education",
				type: "select",
				options: ["Graduate", "Not Graduate"],
				name: "education"
			},
			{
				label: "Self Employed",
				type: "select",
				options: ["Yes", "No"],
				name: "self employed"
			},
			{
				label: "Applicant Income",
				type: "number",
				name: "applicant income"
			},
			{
				label: "Coapplicant Income",
				type: "number",
				name: "coapplicant income"
			},
			{
				label: "Loan Amount",
				type: "number",
				name: "loan amount"
			},
			{
				label: "Loan Amount Term",
				type: "number",
				name: "loan term"
			},
			{
				label: "Credit History",
				type: "number",
				name: "credit history"
			},
			{
				label: "Property Area",
				type: "select",
				options: ["Urban", "Rural", "SemiUrban"],
				name: "property area"
			},
		]
		return ( < Form fieldlist = { fl } submitAction = { this.onSubmit } />)
		}
	}

export default BigForm;