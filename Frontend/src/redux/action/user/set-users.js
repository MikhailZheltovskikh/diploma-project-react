import { ACTION__TYPE } from "../action-type";


export const setUsers = (users) => ({
	type: ACTION__TYPE.SET_USERS,
	payload: users,
});