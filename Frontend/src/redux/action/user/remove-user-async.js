import { request } from '../../../utils';
import { removeUser } from './remove-user';

export const removeUserAsync = (userId) => async (dispatch) => {
	try {
		await request(`/users/${userId}`, 'DELETE')
		dispatch(removeUser(userId));
	} catch (error) {
		// dispatch(setErrorMessage(error.message));
	}
};
