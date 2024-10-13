import { request } from '../../../utils';
import { openModalError } from '../modal';
import { addGroup } from './add-group';
import { groupError } from './group-error';

export const addGroupAsync = (saveGroupData) => async (dispatch) => {
	try {
		const response = await request(`/groups`, 'POST', { name: saveGroupData.name });
		if (response.error) {
			dispatch(groupError(response.error));
			dispatch(
				openModalError({
					error: response.error,
				}),
			);
			return;
		}

		const newGroup = { ...saveGroupData, id: response.data.id };
		dispatch(addGroup(newGroup));
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
		dispatch(
			openModalError({
				error: 'Не удалось добавить новую группу',
			}),
		);
	}
};
