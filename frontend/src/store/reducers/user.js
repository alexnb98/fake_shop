import * as actions from '../actions/types';

const initialState = {
	user: {},
	cart: [],
	loading: false
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.GET_CART:
			return { ...state, loading: true };
		case actions.GET_CART_SUCCESS:
			return { ...state, loading: false, cart: payload };
		case actions.GET_CART_FAIL:
			return { ...state, loading: false };

		default:
			return state;
	}
};
