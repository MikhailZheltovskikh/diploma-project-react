import { request } from '../../../utils';
import { openModalError } from '../modal';
import { productError } from './product-error';
import { removeProduct } from './remove-product';

export const removeProductAsync = (productId) => async (dispatch) => {
	try {
		const response = await request(`/products/${productId}`, 'DELETE');
		if (response.error) {
			dispatch(productError(response.error));
			dispatch(
				openModalError({
					error: response.error,
				}),
			);
			return;
		}

		dispatch(removeProduct(productId));
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
		dispatch(
			openModalError({
				error: 'При удалении товара произошла ошибка',
			}),
		);
	}
};
