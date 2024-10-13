import { request } from '../../../utils';
import { openModalError } from '../modal';
import { editProduct } from './edit-product';
import { productError } from './product-error';

export const editProductAsync = (saveProductData) => async (dispatch) => {
	try {
		const response = await request(`/products/${saveProductData.id}`, 'PATCH', {
			title: saveProductData.title,
			image: saveProductData.image_url,
			description: saveProductData.description,
			price: saveProductData.price,
			group: saveProductData.group,
			amount: saveProductData.amount,
		});

		if (response.error) {
			dispatch(productError(response.error));
			dispatch(
				openModalError({
					error: response.error,
				}),
			);
			return;
		}

		dispatch(editProduct(response.data));
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу');
		dispatch(
			openModalError({
				error: 'При редактировании товара произошла ошибка',
			}),
		);
	}
};
