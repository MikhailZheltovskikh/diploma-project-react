import { ACTION__TYPE } from '../action-type';

export const userError = (error) => ({
	type: ACTION__TYPE.USER_ERROR,
	payload: error,
});
