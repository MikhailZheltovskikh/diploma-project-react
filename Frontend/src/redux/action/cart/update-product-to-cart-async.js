import { request } from '../../../utils';
import { addProductToCart } from './add-product-to-cart';
import { cartError } from './cart-error';
import { cartResetError } from './cart-reset-error';
import { minusProductToCart } from './minus-product-to-cart';

export const updateProductToCartAsync = (productsId, operation) => async (dispatch) => {
	try {
		const id = productsId.id;
		const response = await request(`/cart/update/${id}`, 'POST', { operation });

		if (response.error) {
			dispatch(cartError(response.error));
			return;
		}

		if (operation === 'inc') {
			dispatch(addProductToCart(productsId));
			dispatch(cartResetError());
		}

		if (operation === 'dec') {
			dispatch(minusProductToCart(productsId));
			dispatch(cartResetError());
		}
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
	}
};
