import { ACTION__TYPE } from './action-type';
import { request } from '../utils';

export const logout = () => {
	request("/logout", "POST");

	return {
		type: ACTION__TYPE.LOGOUT,
	};
};