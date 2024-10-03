import { ACTION__TYPE } from '../action-type';

export const openModal = (modalParams) => ({
	type: ACTION__TYPE.OPEN_MODAL,
	payload: modalParams,
});