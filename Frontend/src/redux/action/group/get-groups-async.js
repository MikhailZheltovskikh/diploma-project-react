import { request } from '../../../utils';
import { openModalError } from '../modal';
import { groupError } from './group-error';
import { setGroupsData } from './set-groups-data';

export const getGroupsAsync = () => async (dispatch) => {
	try {
		const response = await request('/groups');
		if (response.error) {
			dispatch(groupError(response.error));
			dispatch(
				openModalError({
					error: response.error,
				}),
			);
			return;
		}

		dispatch(setGroupsData(response.data));
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
		dispatch(
			openModalError({
				error: 'Не удалось получить группы',
			}),
		);
	}
};
