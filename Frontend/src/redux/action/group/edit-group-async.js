import { request } from '../../../utils';
import { editGroup } from './edit-group';

export const editGroupAsync = (saveGroupData) => async (dispatch) => {
	try {
		const updatedGroup = await request(`/groups/${saveGroupData.id}`, 'PATCH', {
			name: saveGroupData.name,
		});
		dispatch(editGroup(updatedGroup.data));
	} catch (error) {
		// dispatch(setErrorMessage(error.message));
	}
};
