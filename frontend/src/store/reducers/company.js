import * as actions from '../actions/types';

const initialState = {
	products: [],
	loading: false
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.GET_PRODUCTS:
			return { ...state, loading: true };
		case actions.GET_PRODUCTS_SUCCESS:
			return { ...state, loading: false, products: payload };
		case actions.GET_PRODUCTS_FAIL:
			return { ...state, loading: false };

		default:
			return state;
	}
};
