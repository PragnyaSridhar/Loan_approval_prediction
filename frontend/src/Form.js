import React from 'react';

class Form extends React.Component {   /*NOTE Required props: changeState and fieldlist */
	constructor(props) {
		super(props);
		this.state = {
			vals:[]
		}
		this.updateVals = this.updateVals.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
		this.submitAction = this.submitAction.bind(this);
	}
	updateVals = (obj) => {
		var vals = this.state.vals;
		vals[obj.name] = obj.value;
		this.setState(vals);
	}
	submitHandler = (event) => {
		event.preventDefault();
		this.submitAction();
	}
	submitAction = () => {
		console.log(this.state.vals);
		this.props.changeState();
	}
	render() {
		return (
			<form className="Form">
				{
					this.props.fieldlist.map((item,index) => {
						if (item.type === "select") {
							return (<FormField key={index} label={item.label} type={item.type} name={item.name} options={item.options} updateVals={this.updateVals} />);
						}
						else {
							return (<FormField key={index} label={item.label} type={item.type} name={item.name} updateVals={this.updateVals} />);
						}
				})}
				< input type = "submit" value = "submit" onClick = {this.submitHandler}
				/>
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
					<select name={this.props.name} onChange={this.myChangeHandler} >
						{this.props.options.map((item,index) => { return (<option key={index} value={item}>{item}</option>);})}
					</select>
				</label>
			)
		} else {
			return (
			<label>
				{this.props.label}:
				< input type = { this.props.type } name = { this.props.name } onChange = { this.myChangeHandler } />
			</label>
			)
		}
	}
}

export default Form;