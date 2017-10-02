import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class SignOut extends Component{
	componentWillMount(){
		this.props.signoutUser();
	}
	render(){
		return(
			<div>
				<p>You have successfully signout!</p>
			</div>
		);
	}
}

export default connect(null, actions)(SignOut);