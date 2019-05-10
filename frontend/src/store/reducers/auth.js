import * as actions from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	userType: false,
	loading: false,
	error: null
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.SET_USER_TYPE:
			return { ...state, userType: payload };
		case actions.REGISTER_START:
			return { ...state, loading: true };
		case actions.REGISTER_SUCCESS:
			localStorage.setItem('token', payload);
			return { ...state, loading: false, token: payload };
		case actions.LOGIN_START:
			return { ...state, loading: true };
		case actions.LOGIN_SUCCESS:
			console.log('LOGIN SUCCESS payload', payload);
			localStorage.setItem('token', payload);
			return { ...state, loading: false, token: payload };
		case actions.REGISTER_FAIL:
		case actions.LOGIN_FAIL:
			localStorage.removeItem('token');
			return { ...state, loading: false, userType: false, error: payload };
		default:
			return state;
	}
};
