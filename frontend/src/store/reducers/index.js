import { combineReducers } from 'redux';
import auth from './auth';
import general from './general';
import alert from './alert';
import user from './user';
import company from './company';

export default combineReducers({
	auth,
	alert,
	general,
	company,
	user
});
