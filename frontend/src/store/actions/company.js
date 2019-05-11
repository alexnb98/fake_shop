import axios from 'axios';
import * as actions from './types';

export const getProducts = () => async (dispatch) => {
	try {
		dispatch({ type: actions.GET_PRODUCTS });
		const res = await axios.get('/api/company/products');
		dispatch({ type: actions.GET_PRODUCTS_SUCCESS, payload: res.data });
	} catch (err) {
		console.error({ ...err });
		dispatch({ type: actions.GET_PRODUCTS_FAIL });
	}
};
