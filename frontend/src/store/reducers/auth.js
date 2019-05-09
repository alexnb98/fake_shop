import * as actions from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: false,
	user: null,
	error: null
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.REGISTER_START:
			return { ...state, loading: true };
		case actions.REGISTER_SUCCESS:
			localStorage.setItem('token', payload.token);
			return { ...state, ...payload, loading: false };
		case actions.REGISTER_FAIL:
			localStorage.removeItem('token');
			return { ...state, loading: false, error: payload };
		case actions.LOGIN_USER:
			return { ...state, loading: true };
		case actions.LOGIN_SUCCESS:
			return { ...state, loading: false, token: payload.token };
		case actions.LOGIN_FAIL:
			return { ...state, loading: false, error: payload };
		default:
			return state;
	}
};
