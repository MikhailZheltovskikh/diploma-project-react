import { request } from "../../../utils";
import { editGroup } from "./edit-group";

export const editGroupAsync = (saveGroupData) => async (dispatch) => {
	try {
		await request(`/groups/${saveGroupData.id}`, 'PATCH', {
			name: saveGroupData.name,
		})
		dispatch(editGroup(saveGroupData));
	} catch (error) {
		// dispatch(setErrorMessage(error.message));
	}
};
