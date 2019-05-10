import { combineReducers } from 'redux';
import auth from './auth';
import products from './products';
import alert from './alert';
import user from './user';

export default combineReducers({
	auth,
	alert,
	products,
	user
});
