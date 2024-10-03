import { ACTION__TYPE } from "../action-type";


export const setRoles = (roles) => ({
	type: ACTION__TYPE.SET_ROLES,
	payload: roles,
});