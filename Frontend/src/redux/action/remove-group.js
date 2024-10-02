import { ACTION__TYPE } from './action-type';

export const removeGroup = (groupId) => ({
	type: ACTION__TYPE.REMOVE_GROUP,
	payload: groupId,
});
