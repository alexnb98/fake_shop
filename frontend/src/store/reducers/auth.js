import * as actions from '../actions/types';
import setAuthToken from '../../utils/setAuthToken';

const initialState = {
	token: localStorage.getItem('token'),
	userType: false,
	id: '',
	loading: false
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.SET_USER_TYPE:
			console.log('payload', payload);
			return { ...state, userType: payload.type, id: payload.id };
		case actions.REGISTER_START:
			return { ...state, loading: true };
		case actions.LOGIN_START:
			return { ...state, loading: true };
		case actions.REGISTER_SUCCESS:
		case actions.LOGIN_SUCCESS:
			localStorage.setItem('token', payload);
			setAuthToken(payload);
			return { ...state, loading: false, token: payload };
		case actions.REGISTER_FAIL:
		case actions.LOGIN_FAIL:
		case actions.LOGOUT:
			setAuthToken(null);
			localStorage.removeItem('token');
			return { ...state, token: null, loading: false, userType: false, id: '' };
		default:
			return state;
	}
};
