import { request } from '../../../utils';
import { openModalError } from '../modal/open-modal-error';
import { cartError } from './cart-error';
import { setProductToCart } from './set-product-to-cart';

export const getProductToCartAsync = () => async (dispatch) => {
	try {
		const response = await request('/cart');
		if (response.error) {
			dispatch(cartError(response.error));
			dispatch(
				openModalError({
					error: response.error,
				}),
			);
			return;
		}

		dispatch(setProductToCart(response.cart));
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
		dispatch(
			openModalError({
				error: 'Не удалось загрузить корзину',
			}),
		);
	}
};
