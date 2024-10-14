import { request } from '../../../utils';
import { authError } from './auth-error';
import { setUser } from '../user';

export const loginAsync = (login, password) => async (dispatch) => {
	try {
		const response = await request('/login', 'POST', { login, password });

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
