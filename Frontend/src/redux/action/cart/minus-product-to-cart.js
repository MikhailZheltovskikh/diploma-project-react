import { ACTION__TYPE } from '../action-type';

export const minusProductToCart = (item) => (dispatch, getState) => {
	const { cart, user } = getState();

	const decProduct = cart.cart.find((product) => product.id === item.id);

	const decCart = cart.cart.map((product) => {
		if (product.id === item.id) {
			return { ...product, count: product.count - 1 };
		}
		return product;
	});

	const decTotalPrice = cart.totalPrice - decProduct.price;

	dispatch({
		type: ACTION__TYPE.DEC_PRODUCT_TO_CART,
		payload: { cart: decCart, totalPrice: decTotalPrice },
	});

	if (user.id === null) {
		localStorage.setItem(
			'cart',
			JSON.stringify({ cart: decCart, totalPrice: decTotalPrice }),
		);
	}
};
