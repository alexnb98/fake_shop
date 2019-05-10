import * as actions from '../actions/types';

const initialState = [];

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.SET_ALERT:
			return [ ...state, payload ];
		case actions.REMOVE_ALERT:
			return state.filter((alert) => alert.id !== payload);
		default:
			return state;
	}
};
