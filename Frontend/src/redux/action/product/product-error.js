import { ACTION__TYPE } from '../action-type';

export const productError = (error) => ({
	type: ACTION__TYPE.PRODUCT_ERROR,
	payload: error,
});
