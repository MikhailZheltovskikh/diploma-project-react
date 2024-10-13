import { request } from '../../../utils';
import { openModalError } from '../modal';
import { removeUser } from './remove-user';
import { userError } from './user-error';

export const removeUserAsync = (userId) => async (dispatch) => {
	try {
		const response = await request(`/users/${userId}`, 'DELETE');
		if (response.error) {
			dispatch(userError(response.error));
			dispatch(
				openModalError({
					error: response.error,
				}),
			);
			return;
		}

		dispatch(removeUser(userId));
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
		dispatch(
			openModalError({
				error: 'При удалении пользователя произошла ошибка',
			}),
		);
	}
};
