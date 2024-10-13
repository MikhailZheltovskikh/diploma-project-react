import { request } from '../../../utils';
import { openModalError } from '../modal';
import { productError } from './product-error';
import { setProductData } from './set-product-data';

export const getProductAsync = (productId) => async (dispatch) => {
	try {
		const response = await request(`/products/${productId}`)

		if (response.error) {
			dispatch(productError(response.error));
			dispatch(
				openModalError({
					error: response.error,
				}),
			);
			return;
		}

		dispatch(setProductData(response.data));
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
		dispatch(
			openModalError({
				error: 'При получении товара произошла ошибка',
			}),
		);
	}

};
