import * as actions from '../actions/types';

const initialState = {
	products: [],
	companyProducts: [],
	cart: [],
	orders: [],
	loading: false
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.LOADING_START:
			return { ...state, loading: true };
		case actions.GET_COMPANY_PRODUCTS:
			return { ...state, companyProducts: payload };
		case actions.GET_PRODUCTS:
			return { ...state, products: payload };
		case actions.GET_CART:
			return { ...state, cart: payload };
		case actions.GET_ORDER:
			return { ...state, orders: payload };
		case actions.LOADING_END:
			return { ...state, loading: false };

		default:
			return state;
	}
};
