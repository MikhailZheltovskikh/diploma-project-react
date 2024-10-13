import { request } from '../../../utils';
import { openModalError } from '../modal/open-modal-error';
import { addProductToCart } from './add-product-to-cart';
import { cartError } from './cart-error';

export const addProductToCartAsync = (products) => async (dispatch) => {
	try {
		const response = await request(`/cart/add`, 'POST', { products });
		if (response.error) {
			dispatch(cartError());
			dispatch(
				openModalError({
					error: response.error,
				}),
			);
			return;
		}

		dispatch(addProductToCart(products));
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
		dispatch(
			openModalError({
				error: 'При добавлении товара в корзину произошла ошибка',
			}),
		);
	}
};


