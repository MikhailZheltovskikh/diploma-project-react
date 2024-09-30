import { ACTION__TYPE } from '../action';

const initialProductState = {
	id: null,
	title: null,
	group: null,
	imageUrl: null,
	description: null,
	price: null,
	amount: null,
};

export const productReducer = (state = initialProductState, action) => {
	switch (action.type) {
		case ACTION__TYPE.REMOVE_PRODUCT:
			return {
				...state,
				...state.products.filter((product) => product.id !== action.payload),
			};
		case ACTION__TYPE.SET_PRODUCT_DATA:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
};
