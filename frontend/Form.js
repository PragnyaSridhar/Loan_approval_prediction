import React from 'react';

class Form extends React.Component {
	render() {
		return (
			<div action={this.props.action}>
				{
					this.props.fieldlist.map((item) => {
					return (<FormField label={item.label} type={item.type} name={item.name} />);
				})}
				< input type = "submit" value = "submit" onClick = { () => { this.props.myprop(); } } />
			</div >
		)
	}
}

class FormField extends React.Component {
	render() {
		if (this.props.type === "select") {
			return(
				<label>
					{this.props.label}:
					<select name={this.props.name}>
						{this.props.options.map((item) => { return (<option value={item}>{item}</option>);})}
					</select>
				</label>
			)
		} else {
			return (
			<label>
				{this.props.label}:
				<input type={this.props.type} name={this.props.name} />
			</label>
			)
		}
	}
}

export default Form;