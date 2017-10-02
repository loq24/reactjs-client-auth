import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOTURL = `http://localhost:3090`;

export function signinUser(values, callback){
	return function(dispatch){
		//Submit our email and password to the server
		const request = axios.post(`${ROOTURL}/signin`, values )
						.then((response) => {
							dispatch({ type: AUTH_USER });
							localStorage.setItem('token', response.data.token);
							callback();
						})
						.catch((error) => dispatch(authError('Bad login info.')));
	}
}

export function authError(error){
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function signoutUser(){
	localStorage.removeItem('token');
	return { type: UNAUTH_USER };
}

export function signupUser({ email, password }, callback){
	return function(dispatch){
		//Submit our email and password to the server
		axios.post(`${ROOTURL}/signup`, {email, password} )
			.then((response) => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem('token', response.data.token);
				callback();
			})
			.catch((error) => {
				dispatch(authError(error.response.data.error));
			});
	}
}

export function fetchMessage(){
	return dispatch => {
		axios.get(`${ROOTURL}`, {
			headers: { authorization: localStorage.getItem('token') }
		})
			.then(response => {
				dispatch({ type: FETCH_MESSAGE, payload: response.data.message })
			})
			.catch(error => {
				console.log(error);
			});
	};
}