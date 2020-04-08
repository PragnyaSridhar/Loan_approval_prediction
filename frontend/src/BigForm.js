import React from 'react';

import Form from './Form.js'

class BigForm extends Form {
	constructor(props) {
		super(props);
	}
	render() {
		var fl = [{
				label: "Gender",
				type: "select",
				options: ["Male", "Female"], /*NOTE First value in the options list will be the the default.*/
				name: "Gender"
			},
			{
				label: "Married",
				type: "select",
				options: ["Yes", "No"],
				name: "Married"
			},
			{
				label: "Dependents",
				type: "select",
				options: ["0", "1", "2", "3+"],
				name: "Dependents"
			},
			{
				label: "Education",
				type: "select",
				options: ["Graduate", "Not Graduate"],
				name: "Education"
			},
			{
				label: "Self Employed",
				type: "select",
				options: ["Yes", "No"],
				name: "Self_Employed"
			},
			{
				label: "Applicant Income",
				type: "number",
				name: "Applicant_Income"
			},
			{
				label: "Coapplicant Income",
				type: "number",
				name: "Coapplicant_Income"
			},
			{
				label: "Loan Amount",
				type: "number",
				name: "Loan_Amount"
			},
			{
				label: "Loan Amount Term",
				type: "number",
				name: "Loan_Amount_Term"
			},
			{
				label: "Credit History",
				type: "number",
				name: "Credit_History"
			},
			{
				label: "Property Area",
				type: "select",
				options: ["Urban", "Rural", "SemiUrban"],
				name: "Property_Area"
			},
		]
		return ( < Form fieldlist = { fl } submitAction = { this.onSubmit } changeState={this.props.changeState} />)
		}
	}

export default BigForm;