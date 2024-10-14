import { request } from '../../../utils';
import { authError } from './auth-error';
import { setUser } from '../user';

export const registerAsync = (login, password) => async (dispatch) => {
	try {
		const response = await request('/register', 'POST', { login, password });

		if (response.error) {
			dispatch(authError(response.error));
			return;
		}

		dispatch(setUser(response.user));
		sessionStorage.setItem('userData', JSON.stringify(response.user));
	} catch (error) {
		console.log(error);
	}
};
