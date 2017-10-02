import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';

import App from './components/app';
import Home from './components/home';
import SignIn from './components/auth/signin';
import SignOut from './components/auth/signout';
import SignUp from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
if(token){
	store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
  	<BrowserRouter>
  		<App>
	  		<Switch>
	  			<Route exact path="/" component={Home} />
	  			<Route path="/signin" component={SignIn} />
	  			<Route path="/signup" component={SignUp} />
	  			<Route path="/signout" component={SignOut} />
	  			<Route path="/feature" component={RequireAuth(Feature)} />
	  		</Switch>
		</App>
	</BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
