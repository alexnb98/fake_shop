import axios from '../../utils/axiosInstance';
import * as actions from './types';
import { setAlert } from './alert';

export const getProducts = () => async (dispatch) => {
	try {
		dispatch({ type: actions.LOADING_START });
		const res = await axios.get('api/product');
		dispatch({
			type: actions.GET_PRODUCTS,
			payload: res.data
		});
	} catch (err) {
		console.error('[actions/global.js] login', { ...err });
	} finally {
		dispatch({ type: actions.LOADING_END });
	}
};

export const getCompanyProducts = (id) => async (dispatch) => {
	try {
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
		console.error('[actions/global.js] getCompanyProducts', { ...err });
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
		console.error('[actions/global.js] getCart', { ...err });
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
		console.error('[actions/global.js] removeFromCart', { ...err });
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
		dispatch({ type: actions.GET_CART, payload: res.data });
	} catch (err) {
		console.error('[actions/global.js] makeOrder', { ...err });
	} finally {
		dispatch({ type: actions.LOADING_END });
	}
};

export const getOrders = () => async (dispatch) => {
	dispatch({ type: actions.LOADING_START });
	try {
		const res = await axios.get('/api/user/order');
		dispatch({ type: actions.GET_ORDER, payload: res.data });
	} catch (err) {
		console.error('[actions/global.js] getOrders', { ...err });
	} finally {
		dispatch({ type: actions.LOADING_END });
	}
};

export const createProduct = (product) => async (dispatch) => {
	try {
		const body = JSON.stringify(product);
		const config = { headers: { 'Content-Type': 'application/json' } };
		dispatch({ type: actions.LOADING_START });
		await axios.post('/api/company/create', body, config);
		dispatch(setAlert('Product Created', 'success'));
	} catch (err) {
		console.error('[actions/global.js] createProduct', { ...err });
	} finally {
		dispatch({ type: actions.LOADING_END });
	}
};

export const updateProduct = (product) => async (dispatch) => {
	try {
		dispatch({ type: actions.UPDATE_PRODUCT });
		const config = { headers: { 'Content-Type': 'application/json' } };
		const body = JSON.stringify(product);
		await axios.put(`/api/company/${product._id}`, body, config);
		dispatch(setAlert('Product Updated', 'success'));
		dispatch({ type: actions.UPDATE_PRODUCT_SUCCESS });
	} catch (err) {
		console.error('[actions/global.js] updateProduct', { ...err });
		dispatch({ type: actions.UPDATE_PRODUCT_FAIL });
	}
};

export const addToCart = (productId, quantity) => async (dispatch) => {
	try {
		const config = { headers: { 'Content-Type': 'application/json' } };
		const body = JSON.stringify({ productId, quantity });
		const res = await axios.post('/api/user/cart', body, config);
		dispatch(setAlert('Product Added To Cart', 'success'));
		dispatch({ type: actions.GET_CART, payload: res.data });
	} catch (err) {
		console.error('[actions/global.js] addToCart', { ...err });
		dispatch({ type: actions.LOADING_END });
	}
};
