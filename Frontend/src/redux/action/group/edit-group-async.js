import { request } from '../../../utils';
import { openModalError } from '../modal';
import { editGroup } from './edit-group';
import { groupError } from './group-error';

export const editGroupAsync = (saveGroupData) => async (dispatch) => {
	try {
		const response = await request(`/groups/${saveGroupData.id}`, 'PATCH', {
			name: saveGroupData.name,
		});

		if (response.error) {
			dispatch(groupError(response.error));
			dispatch(
				openModalError({
					error: response.error,
				}),
			);
			return;
		}

		dispatch(editGroup(response.data));
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
		dispatch(
			openModalError({
				error: 'Не удалось обновить группу',
			}),
		);
	}
};
