import { ACTION__TYPE } from '../action-type';

export const clearProductToCart = () => (dispatch, getState) => {
	const { user } = getState();

	dispatch({
		type: ACTION__TYPE.CLEAR_PRODUCT_TO_CART,
	});

	if (user.id === null) {
		localStorage.setItem('cart', JSON.stringify({ cart: [], totalPrice: 0 }));
	}
};
