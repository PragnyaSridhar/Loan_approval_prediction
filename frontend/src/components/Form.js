import React from 'react';
import "materialize-css/dist/css/materialize.min.css";


class Form extends React.Component {   /*NOTE Required props: submitAction and fieldlist */
	constructor(props) {
		super(props);
		this.state = {
			vals:{}
		}
		this.updateVals = this.updateVals.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
	}
	updateVals = (obj) => {
		var vals = this.state.vals;
		vals[obj.name] = obj.value;
		this.setState(vals);
	}
	submitHandler = (event) => {
		event.preventDefault();
		this.props.submitAction(this.state.vals);
	}
	render() {
		return (
			<form className="center">
				{
					this.props.fieldlist.map((item,index) => {
						if (item.type === "select") {
							return (<FormField key={index} placeholder={item.label} type={item.type} name={item.name} options={item.options} updateVals={this.updateVals}/>);
						}
						else {
							return (<FormField key={index} placeholder={item.label} type={item.type} name={item.name} updateVals={this.updateVals} />);
						}
				})}
				< button type = "submit" value = "submit" onClick = {this.submitHandler} className="hoverable waves-effect waves-light btn brown darken-4" >Submit</ button>
			</form >
		)
	}
}

class FormField extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value:"NA"
		}
		if (this.props.type === "select") {
			this.state = {value:this.props.options[0]}
		}
		this.props.updateVals({
			name: this.props.name,
			value: this.state.value
		});
	}
	myChangeHandler = (event) => {
		console.log("changing....");
		this.setState({ value: event.target.value });
		this.props.updateVals({
			name: this.props.name,
			value: event.target.value
		});
	}
	render() {
		if (this.props.type === "select") {
			return(
				<label>
					{this.props.label}:
					<select name={this.props.name} onChange={this.myChangeHandler} placeholder={this.props.placeholder} >
						{this.props.options.map((item,index) => { return (<option key={index} value={item}>{item}</option>);})}
					</select>
				</label>
			)
		} else {
			return (
			<label>
				{this.props.label}:
				< input type = { this.props.type } placeholder={this.props.placeholder} name = { this.props.name } onChange = { this.myChangeHandler } />
			</label>
			)
		}
	}
}

export default Form;