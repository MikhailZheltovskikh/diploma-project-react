import { ACTION__TYPE } from "../action-type";


export const setProductsData = (products, lastPage) => ({
	type: ACTION__TYPE.SET_PRODUCTS_DATA,
	payload: { products, lastPage },
});
