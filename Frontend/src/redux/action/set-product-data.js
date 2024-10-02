import { ACTION__TYPE } from './action-type';

export const setProductData = (productData) => ({
	type: ACTION__TYPE.SET_PRODUCT_DATA,
	payload: productData,
});
