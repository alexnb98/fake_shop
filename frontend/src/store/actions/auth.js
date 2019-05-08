import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';

export const registerUser = ({ name, email, password }) => async (dispatch) => {
	const config = { headers: { 'Content-Type': 'application/json' } };
	const body = JSON.stringify({ name, email, password });
	try {
		const res = await axios.post('/api/user/register', body, config);
		console.log('res', res);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: REGISTER_FAIL
		});
	}
};
