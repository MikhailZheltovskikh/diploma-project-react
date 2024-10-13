import { ACTION__TYPE } from '../action-type';

export const cartError = (error) => ({
	type: ACTION__TYPE.CART_ERROR,
	payload: error,
});
