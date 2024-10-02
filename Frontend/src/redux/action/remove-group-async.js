import { request } from '../../utils';
import { removeGroup } from './remove-group';

export const removeGroupAsync = (groupId) => async (dispatch) => {
	try {
		await request(`/groups/${groupId}`, 'DELETE');
		dispatch(removeGroup(groupId));
	} catch (error) {
		// dispatch(setErrorMessage(error.message));
	}
};
