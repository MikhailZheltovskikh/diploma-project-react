import { request } from '../../../utils';
import { addProductToCart } from './add-product-to-cart';
import { cartError } from './cart-error';
import { cartResetError } from './cart-reset-error';

export const addProductToCartAsync = (products) => async (dispatch) => {
	try {
		const response = await request(`/cart/add`, 'POST', { products });
		if (response.error) {
			dispatch(cartError(response.error));
			return;
		}

		dispatch(addProductToCart(products));
		dispatch(cartResetError());
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
	}
};
