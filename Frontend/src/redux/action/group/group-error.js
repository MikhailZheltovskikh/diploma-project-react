import { ACTION__TYPE } from '../action-type';

export const groupError = (error) => ({
	type: ACTION__TYPE.GROUP_ERROR,
	payload: error,
});
