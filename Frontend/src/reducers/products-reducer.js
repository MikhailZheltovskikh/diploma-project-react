import { ACTION__TYPE } from '../action';

const initialProductState = {
	products: []
};

export const productsReducer = (state = initialProductState, action) => {
	switch (action.type) {
		case ACTION__TYPE.REMOVE_PRODUCT:
			return {
				...state,
				products: state.products.filter((product) => product.id !== action.payload),
			};

		default:
			return state;
	}
};
