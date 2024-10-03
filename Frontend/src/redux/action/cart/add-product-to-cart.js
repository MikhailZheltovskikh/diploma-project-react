import { ACTION__TYPE } from "../action-type";


export const addProductToCart = (product) => ({
	type: ACTION__TYPE.ADD_PPRODUCT_CART,
	payload: product,
  });