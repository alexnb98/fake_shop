import uuid from 'uuid';
import * as actions from './types';

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
	const id = uuid.v4();
	dispatch({
		type: actions.SET_ALERT,
		payload: { msg, alertType, id }
	});

	setTimeout(() => dispatch({ type: actions.REMOVE_ALERT, payload: id }), timeout);
};
