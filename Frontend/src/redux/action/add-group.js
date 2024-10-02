import { ACTION__TYPE } from './action-type';

export const addGroup = (saveGroupData) => ({
	type: ACTION__TYPE.ADD_GROUP,
	payload: saveGroupData,
});
