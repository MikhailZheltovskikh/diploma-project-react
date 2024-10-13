import { ACTION__TYPE } from '../action-type';

export const authError = (error) => ({
	type: ACTION__TYPE.AUTH_ERROR,
	payload: error,
});
