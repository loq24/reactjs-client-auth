import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AuthReducer from './auth_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: AuthReducer
});

export default rootReducer;
