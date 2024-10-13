import { ACTION__TYPE } from '../action-type';

export const removeProductToCart = (id) => (dispatch, getState) => {
	const { cart, user } = getState();

	const removedCart = cart.cart.filter((product) => product.id !== id);
	const removedTotalPrice = removedCart.reduce(
		(sum, item) => sum + item.price * item.count,
		0,
	);

	dispatch({
		type: ACTION__TYPE.REMOVE_PRODUCT_TO_CART,
		payload: { cart: removedCart, totalPrice: removedTotalPrice },
	});

	if (user.id === null) {
		localStorage.setItem(
			'cart',
			JSON.stringify({ cart: removedCart, totalPrice: removedTotalPrice }),
		);
	}
};
