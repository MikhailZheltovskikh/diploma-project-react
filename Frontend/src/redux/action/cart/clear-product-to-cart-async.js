import { request } from '../../../utils';
import { openModalError } from '../modal';
import { cartError } from './cart-error';
import { clearProductToCart } from './clear-product-to-cart';

export const clearProductToCartAsync = () => async (dispatch) => {
	try {
		const response = await request(`/cart/clear`, 'DELETE');
		if (response.error) {
			dispatch(cartError(response.error));
			dispatch(
				openModalError({
					error: response.error,
				}),
			);
			return;
		}

		dispatch(clearProductToCart());
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
		dispatch(
			openModalError({
				error: 'При очистке корзины произошла ошибка',
			}),
		);
	}
};
