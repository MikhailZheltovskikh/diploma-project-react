import { request } from '../../../utils';
import { editUser } from './edit-user';

export const editUserAsync = (saveUserData) => async (dispatch) => {
	try {
		const updatedUser = await request(`/users/${saveUserData.id}`, 'PATCH', {
			roleId: saveUserData.newRole,
		});
		dispatch(editUser(updatedUser.data));
	} catch (error) {
		// dispatch(setErrorMessage(error.message));
	}
};
