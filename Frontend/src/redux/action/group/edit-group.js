import { ACTION__TYPE } from '../action-type';

export const editGroup = (saveGroupData) => ({
	type: ACTION__TYPE.EDIT_GROUP,
	payload: saveGroupData,
});
