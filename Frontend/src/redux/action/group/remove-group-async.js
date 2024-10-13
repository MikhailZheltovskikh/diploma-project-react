import { request } from '../../../utils';
import { openModalError } from '../modal';
import { groupError } from './group-error';
import { removeGroup } from './remove-group';

export const removeGroupAsync = (groupId) => async (dispatch) => {
	try {
		const response = await request(`/groups/${groupId}`, 'DELETE');
		if (response.error) {
			dispatch(groupError(response.error));
			dispatch(
				openModalError({
					error: response.error,
				}),
			);
			return;
		}

		dispatch(removeGroup(groupId));
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
		dispatch(
			openModalError({
				error: 'При удалении группы произошла ошибка',
			}),
		);
	}
};
