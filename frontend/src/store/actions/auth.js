import axios from 'axios';
import * as actions from './types';

export const registerUser = ({ name, email, password }) => async (dispatch) => {
	const config = { headers: { 'Content-Type': 'application/json' } };
	const body = JSON.stringify({ name, email, password });
	console.log('body', body);
	try {
		dispatch({ type: actions.REGISTER_START });
		const res = await axios.post('/api/user/register', body, config);
		dispatch({
			type: actions.REGISTER_SUCCESS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: actions.REGISTER_FAIL,
			payload: err
		});
	}
};

export const loginUser = ({ email, password }) => async (dispatch) => {
	const config = { headers: { 'Content-Type': 'application/json' } };
	const body = JSON.stringify({ email, password });
	try {
		dispatch({ type: actions.LOGIN_USER });
		const res = await axios.post('/api/user/login', body, config);
		console.log('[actions/auth.js] res.data', res.data);
		dispatch({
			type: actions.LOGIN_SUCCESS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: actions.LOGIN_FAIL,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};
