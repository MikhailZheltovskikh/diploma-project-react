import { request } from '../../../utils';
import { setRoles } from './set-roles';
import { setUsers } from './set-users';

export const getUsersAsync = () => async (dispatch) => {

	try {
		const [usersRes, rolesRes] = await Promise.all([request('/users'), request('/users/roles')]);
		dispatch(setUsers(usersRes.data));
		dispatch(setRoles(rolesRes.data));
	} catch (error) {
		// dispatch(setErrorMessage(error.message));
	}
};


