import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router-dom';

class SignUp extends Component{
	renderField({label, type, input, name, meta: { touched, error }}){
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;
		return ( 
			<div className={className}>
				<label>{label}</label>	
				<input 
					className="form-control"
					type={type}
					name={name}
					{...input}
				/>
				{touched && (error && <span className="text-help">{error}</span>)}
			</div> 
		);
	}

	handleFormSubmit( values ){
		this.props.signupUser(values, () => {
				this.props.reset();
				this.props.history.push('/feature');
			});
	}

	render(){
		const { handleSubmit, pristine, reset, submitting } = this.props;
		return(
			<div>
				{ this.props.errorMessage && <div className="alert alert-danger"><strong>Ooops!</strong> {this.props.errorMessage}</div> }
				<form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
					<Field 
						label="Email"
						name="email"
						type="email"
						component={this.renderField}
					/>
					<Field 
						label="Password"
						name="password"
						type="password"
						component={this.renderField}
					/>
					<Field 
						label="Confirm Password"
						name="confirm_password"
						type="password"
						component={this.renderField}
					/>
					<button style={{marginRight:"10px"}} type="submit" className="btn btn-primary" disabled={submitting}>Sign Up</button>
				    <button type="button" className="btn"  disabled={pristine || submitting} onClick={reset}>Clear Values</button>
				</form> 
			</div>
		);
	}
}

function mapStateToProps(state){
	return{ errorMessage: state.auth.error };
}

const validate = values => {
	const errors = {};
	const email = values.email;
	const password = values.password;
	const confirm_password = values.confirm_password;
	if(email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
		errors.email = 'Invalid email!'
	}
	if(!email){
		errors.email = 'Email field is required!';	
	}
	if(!password){
		errors.password = 'You should provide a password.';	
	}
	if(!confirm_password){
		errors.confirm_password = 'You should confirm your password.';	
	}
	if(confirm_password != password){
		errors.confirm_password = 'Password doesn\'t match.';	
	}

	return errors;
}

export default  reduxForm({
	form: 'SignUpForm',
	validate: validate,
})(connect(mapStateToProps, actions)(SignUp));