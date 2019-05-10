import * as actions from './types';
import axios from 'axios';
import { setAlert } from './alert';

export const getCart = () => async (dispatch) => {
	dispatch({ type: actions.GET_CART });
	try {
		const res = await axios.get('/api/user/cart');
		dispatch({ type: actions.GET_CART_SUCCESS, payload: res.data });
	} catch (err) {
		const error = err.response.data.msg;
		if (error) dispatch(setAlert(error, 'danger'));
		const errors = err.response.data.errors;
		if (errors) errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		dispatch({ type: actions.GET_CART_FAIL });
	}
};
