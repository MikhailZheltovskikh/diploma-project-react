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
		isLoading: true,
		error: null,
	},
};

export const productReducer = (state = initialProductState, action) => {
	switch (action.type) {
		case ACTION__TYPE.PRODUCT_ERROR:
			return {
				...state,
				products: {
					error: action.payload,
				},
			};
		case ACTION__TYPE.PRODUCT_RESET_ERROR:
			return {
				...state,
				products: {
					error: null,
				},
			};
		case ACTION__TYPE.ADD_PRODUCT:
			return {
				...state,
				products: {
					products: [...state.products, action.payload],
					lastPage: 1,
					isLoading: false,
				},
			};
		case ACTION__TYPE.EDIT_PRODUCT:
			return {
				...state,
				products: {
					...state.products,
					products: state.products.products.map((product) => {
						return product.id === action.payload.id
							? action.payload
							: product;
					}),
				},
			};

		case ACTION__TYPE.REMOVE_PRODUCT:
			return {
				...state,
				products: {
					...state.products,
					products: state.products.products.filter(
						(product) => product.id !== action.payload,
					),
				},
			};
		case ACTION__TYPE.SET_PRODUCTS_DATA:
			return {
				...state,
				products: {
					...state.products,
					products: action.payload.products,
					lastPage: action.payload.lastPage,
					isLoading: false,
				},
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
