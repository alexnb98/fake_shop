import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import global from './global';

export default combineReducers({
	auth,
	alert,
	global
});
