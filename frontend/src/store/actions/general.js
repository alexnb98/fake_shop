import axios from 'axios';
import { GET_PRODUCTS, GET_PRODUCTS_FAIL, GET_PRODUCTS_SUCCESS } from './types';
import { setAlert } from './alert';

export const getProducts = () => async (dispatch) => {
	try {
		dispatch({ type: GET_PRODUCTS });
		const res = await axios.get('api/product');
		dispatch({
			type: GET_PRODUCTS_SUCCESS,
			payload: res.data
		});
	} catch (err) {
		const error = err.response.data.msg;
		if (error) dispatch(setAlert(error, 'danger'));
		const errors = err.response.data.errors;
		if (errors) errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		dispatch({
			type: GET_PRODUCTS_FAIL,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};
