import { request } from "../../../utils";
import { addProduct } from "./add-product";


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
		const newProduct = { ...saveProductData, id: response.data.id };
		dispatch(addProduct(newProduct));
	} catch (error) {
		// dispatch(setErrorMessage(error.message));
	}
};
