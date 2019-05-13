import axios from 'axios';
import * as actions from './types';
import { setAlert } from './alert';
import jwt_decode from 'jwt-decode';

const handleError = (err, dispatch) => {
	console.error({ ...err });
	const error = err.response && err.response.data.msg;
	if (error) setAlert(error, 'danger');
	const errors = err.response && err.response.data.errors;
	if (errors) errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
	dispatch(setAlert('something went wrong', 'danger'));
};

export const register = ({ name, email, password, isUser }) => async (dispatch) => {
	const config = { headers: { 'Content-Type': 'application/json' } };
	const body = JSON.stringify({ name, email, password });
	try {
		dispatch({ type: actions.REGISTER_START });
		let res;
		if (isUser) {
			res = await axios.post('/api/user/register', body, config);
		} else {
			res = await axios.post('/api/company/register', body, config);
		}
		console.log('res.data TOKEN', res.data);
		dispatch({
			type: actions.REGISTER_SUCCESS,
			payload: res.data
		});
		dispatch(setUserType());
	} catch (err) {
		handleError(err, dispatch);
		dispatch({ type: actions.REGISTER_FAIL });
	}
};

export const login = ({ email, password }, isUser) => async (dispatch) => {
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
	const token = sessionStorage.token;
	if (!token) return dispatch({ type: actions.SET_USER_TYPE, payload: { type: false, id: null } });
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
