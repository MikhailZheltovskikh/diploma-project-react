import { ACTION__TYPE } from './action-type';

export const setUser = (user) => ({
	type: ACTION__TYPE.SET_USER,
	payload: user,
});