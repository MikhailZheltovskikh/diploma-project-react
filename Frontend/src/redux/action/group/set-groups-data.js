import { ACTION__TYPE } from '../action-type';

export const setGroupsData = (groups) => ({
	type: ACTION__TYPE.SET_GROUPS_DATA,
	payload: groups,
});
