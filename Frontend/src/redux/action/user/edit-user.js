import { ACTION__TYPE } from '../action-type';

export const editUser = (updatedUser) => ({
	type: ACTION__TYPE.EDIT_USER,
	payload: updatedUser,
});
