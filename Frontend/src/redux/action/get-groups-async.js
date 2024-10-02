import { request } from "../../utils";
import { setGroupsData } from "./set-groups-data";


export const getGroups = () => async (dispatch) => {
	try {
		const response = await request('/groups');
		const { data } = response;
		dispatch(setGroupsData(data));
	} catch (error) {
		// dispatch(setErrorMessage(error.message));
	}
};
