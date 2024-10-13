import { request } from '../../../utils';
import { openModalError } from '../modal';
import { setRoles } from './set-roles';
import { setUsers } from './set-users';
import { userError } from './user-error';

export const getUsersAsync = () => async (dispatch) => {
	try {
		const responseUser = await request('/users');
		if (responseUser.error) {
			dispatch(userError(responseUser.error));
			return;
		}

		const responseRole = await request('/users/roles');

		if (responseRole.error) {
			dispatch(userError(responseRole.error));
			return;
		}

		dispatch(setUsers(responseUser.data));
		dispatch(setRoles(responseRole.data));
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
		dispatch(
			openModalError({
				error: 'При получении пользователя произошла ошибка',
			}),
		);
	}
};
