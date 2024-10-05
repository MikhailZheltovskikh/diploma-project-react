import { ACTION__TYPE } from '../action-type';

export const addProduct = (saveProductData) => ({
	type: ACTION__TYPE.ADD_PRODUCT,
	payload: saveProductData,
});
