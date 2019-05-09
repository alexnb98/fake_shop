import axios from 'axios';
import { GET_PRODUCTS, GET_PRODUCTS_FAIL, GET_PRODUCTS_SUCCESS } from './types';

export const getProducts = () => async (dispatch) => {
	try {
		dispatch({ type: GET_PRODUCTS });
		const res = await axios.get('api/product');
		console.log('[actions/product] res.data', res.data);
		dispatch({
			type: GET_PRODUCTS_SUCCESS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: GET_PRODUCTS_FAIL,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};
