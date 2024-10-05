import { ACTION__TYPE } from '../action-type';

export const editProduct = (saveProductData) => ({
	type: ACTION__TYPE.EDIT_PRODUCT,
	payload: saveProductData,
});
