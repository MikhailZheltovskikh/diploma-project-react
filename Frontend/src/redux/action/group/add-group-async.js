import { request } from "../../../utils";
import { addGroup } from "./add-group";


export const addGroupAsync = (saveGroupData) => async (dispatch) => {
	try {
		const response = await request(`/groups`, 'POST', { name: saveGroupData.name });
		const newGroup = { ...saveGroupData, id: response.data.id };
		dispatch(addGroup(newGroup));
	} catch (error) {
		// dispatch(setErrorMessage(error.message));
	}
};
