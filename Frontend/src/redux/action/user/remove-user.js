import { ACTION__TYPE } from '../action-type';

export const removeUser = (userId) => ({
	type: ACTION__TYPE.REMOVE_USER,
	payload: userId,
});
