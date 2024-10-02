import { request } from '../../utils';
import { ACTION__TYPE } from './action-type';

export const logout = () => {
	request('/logout', 'POST');

	return {
		type: ACTION__TYPE.LOGOUT,
	};
};
