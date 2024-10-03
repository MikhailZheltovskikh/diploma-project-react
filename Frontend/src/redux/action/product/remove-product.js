import { ACTION__TYPE } from '../action-type';

export const removeProduct = (productId) => ({
	type: ACTION__TYPE.REMOVE_PRODUCT,
	payload: productId,
});
