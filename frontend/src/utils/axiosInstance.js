import axios from 'axios';
import store from '../store/store';
import { setAlert } from '../store/actions/alert';

const instance = axios.create({
	baseurl: '/',
	timeout: 2000
});

instance.interceptors.response.use(
	(res) => {
		return res;
	},
	(err) => {
		console.log('[axiosInstance.js] error', { ...err });
		if (err.code === 'ECONNABORTED') {
			store.dispatch(setAlert('No response from server, try again later', 'danger'));
		} else if (err.response) {
			if (err.response.data.msg) {
				store.dispatch(setAlert(err.response.data.msg, 'danger'));
			}
			if (err.response.data.errors) {
				err.response.data.errors.forEach((error) => store.dispatch(setAlert(error.msg, 'danger')));
			}
		} else {
			store.dispatch(setAlert('Something went wrong', 'danger'));
		}
		return err;
	}
);

export default instance;
