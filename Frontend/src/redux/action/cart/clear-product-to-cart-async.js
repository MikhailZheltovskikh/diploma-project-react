import { request } from '../../../utils';
import { cartError } from './cart-error';
import { cartResetError } from './cart-reset-error';
import { clearProductToCart } from './clear-product-to-cart';

export const clearProductToCartAsync = () => async (dispatch) => {
	try {
		const response = await request(`/cart/clear`, 'DELETE');
		if (response.error) {
			dispatch(cartError(response.error));
			return;
		}

		dispatch(clearProductToCart());
		dispatch(cartResetError());
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
	}
};
