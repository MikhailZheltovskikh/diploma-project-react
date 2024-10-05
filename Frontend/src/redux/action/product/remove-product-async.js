import { request } from '../../../utils';
import { removeProduct } from './remove-product';

export const removeProductAsync = (productId) => async (dispatch) => {
	try {
		await request(`/products/${productId}`, 'DELETE');
		dispatch(removeProduct(productId));
	} catch (error) {
		// dispatch(setErrorMessage(error.message));
	}
};
