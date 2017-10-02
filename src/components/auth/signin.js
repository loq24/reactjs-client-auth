import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import Header from '../header';

class SignIn extends Component{
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

	onSubmit( values ){
		this.props.signinUser(values, () => {
			this.props.history.push('/feature');
		});
	}

	render(){
		const { handleSubmit, pristine, reset, submitting } = this.props;
		return(
			<div>
				{ this.props.errorMessage && <div className="alert alert-danger"><strong>Ooops!</strong> {this.props.errorMessage}</div> }
				<form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
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
					<button style={{marginRight:"10px"}} type="submit" className="btn btn-primary" disabled={submitting}>Sign In</button>
				    <button type="button" className="btn"  disabled={pristine || submitting} onClick={reset}>Clear Values</button>
				</form> 	
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		errorMessage: state.auth.error
	};
}

const validate = values => {
	const errors = {};
	const email = values.email;
	const password = values.password;
	if(email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
		errors.email = 'Invalid email!'
	}
	if(!email){
		errors.email = 'Email field is required!'	
	}
	if(!password){
		errors.password = 'You should provide a password.'	
	}
	return errors;
}

export default  reduxForm({
	form: 'SignInForm',
	validate: validate,
})(connect(mapStateToProps, actions)(SignIn));