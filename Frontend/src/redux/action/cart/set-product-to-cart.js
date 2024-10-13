import { ACTION__TYPE } from "../action-type";


export const setProductToCart = (cart) => ({
	type: ACTION__TYPE.SET_PRODUCT_TO_CART,
	payload: cart,
});