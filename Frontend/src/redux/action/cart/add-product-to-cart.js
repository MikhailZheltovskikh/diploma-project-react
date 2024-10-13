import { ACTION__TYPE } from '../action-type';

export const addProductToCart = (item) => (dispatch, getState) => {
	const { cart, user } = getState();

	const addProduct = cart.cart.find((cartItem) => cartItem.id === item.id);
	let updatedCart;
	if (addProduct) {
		updatedCart = cart.cart.map((cartItem) => {
			if (cartItem.id === item.id) {
				return { ...cartItem, count: cartItem.count + 1 };
			}
			return cartItem;
		});
	} else {
		updatedCart = [...cart.cart, { ...item}];
	}

	const newTotalPrice = updatedCart.reduce(
		(sum, cartItem) => sum + cartItem.price * cartItem.count,
		0,
	);

	dispatch({
		type: ACTION__TYPE.ADD_PRODUCT_TO_CART,
		payload: { cart: updatedCart, totalPrice: newTotalPrice },
	});

	if(user.id === null){
		localStorage.setItem(
			'cart',
			JSON.stringify({ cart: updatedCart, totalPrice: newTotalPrice }),
		);
	}


};
