import { request } from '../../../utils';
import { cartError } from './cart-error';
import { cartResetError } from './cart-reset-error';
import { removeProductToCart } from './remove-product-to-cart';

export const removeProductToCartAsync = (productsId) => async (dispatch) => {
	try {
		const response = await request(`/cart/remove/${productsId}`, 'DELETE');

		if (response.error) {
			dispatch(cartError(response.error));
			return;
		}

		dispatch(removeProductToCart(productsId));
		dispatch(cartResetError());
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
	}
};
