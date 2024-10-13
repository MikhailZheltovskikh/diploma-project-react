import { request } from '../../../utils';
import { openModalError } from '../modal';
import { addProductToCart } from './add-product-to-cart';
import { cartError } from './cart-error';
import { minusProductToCart } from './minus-product-to-cart';

export const updateProductToCartAsync = (productsId, operation) => async (dispatch) => {
	try {
		const id = productsId.id;
		const response = await request(`/cart/update/${id}`, 'POST', { operation });

		if (response.error) {
			dispatch(cartError(response.error));
			dispatch(
				openModalError({
					error: response.error,
				}),
			);
			return;
		}

		if (operation === 'inc') {
			dispatch(addProductToCart(productsId));
		}

		if (operation === 'dec') {
			dispatch(minusProductToCart(productsId));
		}
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
		dispatch(
			openModalError({
				error: 'При обновлении товаров в корзине произошла ошибка',
			}),
		);
	}
};
