import { ACTION__TYPE } from '../action';

const initialCartState = {
	cart: [],
	isLoading: true,
	totalPrice: 0,
	error: null,
};

export const cartReducer = (state = initialCartState, action) => {
	switch (action.type) {
		case ACTION__TYPE.CART_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case ACTION__TYPE.CART_RESET_ERROR:
			return {
				...state,
				error: null,
			};
		case ACTION__TYPE.REMOVE_PRODUCT_TO_CART:
			return {
				...state,
				cart: action.payload.cart,
				totalPrice: action.payload.totalPrice,
				isLoading: false,
			};

		case ACTION__TYPE.DEC_PRODUCT_TO_CART:
			return {
				...state,
				cart: action.payload.cart,
				totalPrice: action.payload.totalPrice,
			};

		case ACTION__TYPE.ADD_PRODUCT_TO_CART:
			return {
				...state,
				cart: action.payload.cart,
				totalPrice: action.payload.totalPrice,
				isLoading: false,
			};

		case ACTION__TYPE.CLEAR_PRODUCT_TO_CART:
			return {
				...state,
				cart: [],
				totalPrice: 0,
				isLoading: false,
			};
		case ACTION__TYPE.SET_PRODUCT_TO_CART:
			return {
				...state,
				...action.payload,
			};

		default:
			return state;
	}
};
