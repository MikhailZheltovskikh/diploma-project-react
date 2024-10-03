import { ACTION__TYPE } from '../action';

const initialProductState = {
	id: null,
	title: null,
	group: null,
	imageUrl: null,
	description: null,
	price: null,
	amount: null,
	products: {
		products: [],
		lastPage: 1,
		isLoading: false,
		error: null,
	},
};

export const productReducer = (state = initialProductState, action) => {
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
		case ACTION__TYPE.SET_PRODUCT_DATA:
			return {
				...state,
				...action.payload,
			};
		case ACTION__TYPE.SET_LOADING:
			return { ...state, isLoading: action.isLoading };
		default:
			return state;
	}
};
