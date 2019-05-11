import axios from 'axios';
import * as actions from './types';
import { setAlert } from './alert';
import jwt_decode from 'jwt-decode';

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
		dispatch(setUserType());
	} catch (err) {
		console.log('[actions/auth.js] reigsterUser err', err);
		dispatch({
			type: actions.REGISTER_FAIL,
			payload: err
		});
	}
};

export const loginUser = ({ email, password }, isUser) => async (dispatch) => {
	const config = { headers: { 'Content-Type': 'application/json' } };
	const body = JSON.stringify({ email, password });
	try {
		dispatch({ type: actions.LOGIN_START });
		const path = isUser ? '/api/user/login' : '/api/company/login';
		const res = await axios.post(path, body, config);
		dispatch({
			type: actions.LOGIN_SUCCESS,
			payload: res.data
		});
		dispatch(setUserType());
		dispatch(setAlert('Login Successfull', 'success'));
	} catch (err) {
		const error = err.response.data.msg;
		if (error) dispatch(setAlert(error, 'danger'));
		const errors = err.response.data.errors;
		if (errors) errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		dispatch({
			type: actions.LOGIN_FAIL,
			payload: { msg: err.response.data.msg, status: err.response.status }
		});
	}
};

export const setUserType = () => (dispatch) => {
	const token = localStorage.token;
	if (!token) return dispatch({ type: actions.SET_USER_TYPE, payload: false });
	const decode = jwt_decode(token);
	if (decode.company) {
		return dispatch({ type: actions.SET_USER_TYPE, payload: { type: 'company', id: decode.company.id } });
	}
	if (decode.user) {
		return dispatch({ type: actions.SET_USER_TYPE, payload: { type: 'user', id: decode.user.id } });
	}
};

export const logout = () => (dispatch) => {
	dispatch({ type: actions.LOGOUT });
};
