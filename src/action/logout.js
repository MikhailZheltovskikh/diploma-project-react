import { ACTION__TYPE } from './action-type';
import { server } from "../bff"

export const logout = (session) => {
	server.logout(session);

	return {
		type: ACTION__TYPE.LOGOUT,
	};
};