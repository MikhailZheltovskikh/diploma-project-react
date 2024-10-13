import { request } from "../../../utils";
import { openModalError } from "../modal";
import { addProduct } from "./add-product";
import { productError } from "./product-error";


export const addProductAsync = (saveProductData) => async (dispatch) => {
	try {
		const response = await request(`/products`, 'POST', {
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

		const newProduct = { ...saveProductData, id: response.data.id };
		dispatch(addProduct(newProduct));
	} catch (error) {
		console.log('Возникла ошибка при обращении к серверу', error);
		dispatch(
			openModalError({
				error: 'При добавлении товара произошла ошибка',
			}),
		);
	}
};
