import { request } from '../../../utils';
import { openModalError } from '../modal';
import { editUser } from './edit-user';
import { userError } from './user-error';

export const editUserAsync = (saveUserData) => async (dispatch) => {
	try {
		const response = await request(`/users/${saveUserData.id}`, 'PATCH', {
			roleId: saveUserData.newRole,
		});

		if (response.error) {
			dispatch(userError(response.error));
			dispatch(
				openModalError({
					error: response.error,
				}),
			);
			return;
		}

		dispatch(editUser(response.data));
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
		dispatch(
			openModalError({
				error: 'При редактировании пользователя произошла ошибка',
			}),
		);
	}
};
