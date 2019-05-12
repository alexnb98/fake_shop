import axios from 'axios';
import * as actions from './types';
import { setAlert } from './alert';

const handleError = (err, dispatch) => {
	console.error({ ...err });
	const error = err.response && err.response.data.msg;
	if (error) setAlert(error, 'danger');
	const errors = err.response && err.response.data.errors;
	if (errors) errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
	dispatch(setAlert('something went wrong', 'danger'));
};

export const getProducts = () => async (dispatch) => {
	try {
		console.log('getProducts');
		dispatch({ type: actions.LOADING_START });
		const res = await axios.get('api/product');
		dispatch({
			type: actions.GET_PRODUCTS,
			payload: res.data
		});
	} catch (err) {
		handleError(err, dispatch);
	} finally {
		dispatch({ type: actions.LOADING_END });
	}
};

export const getCompanyProducts = (id) => async (dispatch) => {
	try {
		console.log('getCompanyProducts');
		dispatch({ type: actions.LOADING_START });
		let res;
		if (id) {
			//TODO: IN THE BACKEND
			res = await axios.get(`/api/company/${id}`);
		} else {
			res = await axios.get('/api/company/products');
		}
		dispatch({ type: actions.GET_COMPANY_PRODUCTS, payload: res.data });
	} catch (err) {
		handleError(err, dispatch);
	} finally {
		dispatch({ type: actions.LOADING_END });
	}
};

export const getCart = () => async (dispatch) => {
	dispatch({ type: actions.LOADING_START });
	try {
		const res = await axios.get('/api/user/cart');
		dispatch({ type: actions.GET_CART, payload: res.data });
	} catch (err) {
		handleError(err, dispatch);
	} finally {
		dispatch({ type: actions.LOADING_END });
	}
};

export const removeFromCart = (id) => async (dispatch) => {
	dispatch({ type: actions.LOADING_START });
	try {
		const res = await axios.delete(`/api/user/cart/${id}`);
		setAlert('Item removed from Cart', 'success');
		dispatch({ type: actions.GET_CART, payload: res.data });
	} catch (err) {
		handleError(err, dispatch);
	} finally {
		dispatch({ type: actions.LOADING_END });
	}
};

export const makeOrder = (userAddress) => async (dispatch) => {
	dispatch({ type: actions.LOADING_START });
	try {
		const config = { headers: { 'Content-Type': 'application/json' } };
		const body = JSON.stringify(userAddress);
		const res = await axios.post('/api/user/order', body, config);
		console.log('res.data SHOULD BE NEW CART', res.data);
		dispatch({ type: actions.GET_ORDER, payload: res.data });
	} catch (err) {
		handleError(err, dispatch);
	} finally {
		dispatch({ type: actions.LOADING_END });
	}
};

export const getOrders = () => async (dispatch) => {
	dispatch({ type: actions.LOADING_START });
	try {
		const res = await axios.get('/api/user/order');
		console.log('res.data ORDERS', res.data);
		dispatch({ type: actions.GET_ORDER, payload: res.data });
	} catch (err) {
		handleError(err, dispatch);
	} finally {
		dispatch({ type: actions.LOADING_END });
	}
};

export const createProduct = (product) => async (dispatch) => {
	try {
		const body = JSON.stringify(product);
		const config = { headers: { 'Content-Type': 'application/json' } };
		dispatch({ type: actions.LOADING_START });
		const res = await axios.post('/api/company/create', body, config);
		dispatch(setAlert('Product Created', 'success'));
	} catch (err) {
		dispatch(setAlert(err.response, 'success'));
	} finally {
		dispatch({ type: actions.LOADING_END });
	}
};

export const updateProduct = (product) => async (dispatch) => {
	try {
		dispatch({ type: actions.UPDATE_PRODUCT });
		const config = { headers: { 'Content-Type': 'application/json' } };
		const body = JSON.stringify(product);
		const res = await axios.put(`/api/company/${product._id}`, body, config);
		console.log('res.data', res.data);
		dispatch(setAlert('Product Updated', 'success'));
		dispatch({ type: actions.UPDATE_PRODUCT_SUCCESS });
	} catch (err) {
		console.log('err', { ...err });
		dispatch(setAlert(err.response, 'success'));
		dispatch({ type: actions.UPDATE_PRODUCT_FAIL });
	}
};
