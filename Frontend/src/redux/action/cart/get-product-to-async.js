import { request } from '../../../utils';
import { cartError } from './cart-error';
import { cartResetError } from './cart-reset-error';
import { setProductToCart } from './set-product-to-cart';

export const getProductToCartAsync = () => async (dispatch) => {
	try {
		const response = await request('/cart');
		if (response.error) {
			dispatch(cartError(response.error));
			return;
		}

		dispatch(setProductToCart(response.cart));
		dispatch(cartResetError());
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
	}
};
