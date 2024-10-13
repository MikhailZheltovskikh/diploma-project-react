import { ACTION__TYPE } from '../action-type';

export const openModalError = (modalParams) => ({
	type: ACTION__TYPE.OPEN_ERROR_MODAL,
	payload: modalParams,
});