import { request } from '../../../utils';
import { editProduct } from './edit-product';

export const editProductAsync = (saveProductData) => async (dispatch) => {
	try {
		const updatedProduct = await request(`/products/${saveProductData.id}`, 'PATCH', {
			title: saveProductData.title,
			image: saveProductData.image_url,
			description: saveProductData.description,
			price: saveProductData.price,
			group: saveProductData.group,
			amount: saveProductData.amount,
		});
		dispatch(editProduct(updatedProduct.data));
	} catch (error) {
		// dispatch(setErrorMessage(error.message));
	}
};
