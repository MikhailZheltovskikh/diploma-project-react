import { request } from '../../../utils';
import { openModalError } from '../modal';
import { cartError } from './cart-error';
import { removeProductToCart } from './remove-product-to-cart';

export const removeProductToCartAsync = (productsId) => async (dispatch) => {
	try {
		const response = await request(`/cart/remove/${productsId}`, 'DELETE');

		if (response.error) {
			dispatch(cartError(response.error));
			dispatch(
				openModalError({
					error: response.error,
				}),
			);
			return;
		}

		dispatch(removeProductToCart(productsId));
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
		dispatch(
			openModalError({
				error: "При удалении товара произошла ошибка",
			}),
		);
	}
};
