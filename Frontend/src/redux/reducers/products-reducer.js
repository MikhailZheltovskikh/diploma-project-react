import { ACTION__TYPE } from '../action';

const initialProductsState = {
	products: [],
	lastPage: 1,
	isLoading: false,
	error: null,
};

export const productsReducer = (state = initialProductsState, action) => {
	switch (action.type) {
		case ACTION__TYPE.REMOVE_PRODUCT:
			return {
				...state,
				products: state.products.filter(
					(product) => product.id !== action.payload,
				),
			};
		case ACTION__TYPE.SET_PRODUCTS_DATA:
			return {
				...state,
				products: action.products,
				lastPage: action.lastPage,
				isLoading: false,
			};

		case ACTION__TYPE.SET_LOADING:
			return { ...state, isLoading: action.isLoading };
		default:
			return state;
	}
};
